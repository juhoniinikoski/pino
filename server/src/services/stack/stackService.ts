import { boolean, number, object, string } from 'yup';
import StackClass, { Stack } from '../../models/Stack';
import UserClass from '../../models/User';
import { PageInfoType } from '../../utils/entities';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'objection';
import { AuthenticationError } from 'apollo-server';
import { StackChannel } from '../../models/StackChannel';

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  createdBy?: number | string;
  public?: boolean;
}

interface EdgeType {
  cursor: string;
  node: StackClass;
}

interface StackConnection {
  totalCount: number;
  pageInfo: PageInfoType;
  edges: EdgeType[];
}

const argsSchema = object({
  after: string(),
  first: number().min(1).max(30).default(30),
  orderDirection: string().default('DESC'),
  orderBy: string().default('CREATED_AT'),
  searchKeyword: string().trim(),
  createdBy: string().trim(),
  public: boolean(),
});

const getLikeFilter = (value: string) => `%${value}%`;

export const getStacks = async (args: Args): Promise<StackConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, after, searchKeyword, createdBy, public: publicStack } = normalizedArgs;

  let query = Stack.query();

  if (publicStack) {
    query = query.where('public', true);
  }

  if (createdBy) {
    query = query.where('createdById', args.createdBy);
  }

  if (searchKeyword) {
    const likeFilter = getLikeFilter(searchKeyword);

    query = query.where((qb) => {
      return qb.where('name', 'like', likeFilter);
    });
  }

  const count = query.clone();

  query = query.select('*', Stack.relatedQuery('questions').count().as('questions'));

  return await query.cursorPaginateStack(count, {
    first,
    after,
    orderBy: [{ column: 'createdAt', order: orderDirection.toLowerCase() }, 'id'],
  });
};

export const getStack = async (id: string | number): Promise<StackClass> =>
  await Stack.query()
    .findById(id)
    .select('*', Stack.relatedQuery('questions').count().as('questions'))
    .withGraphFetched('tags');

const stackSchema = object({
  name: string().required(),
  public: boolean().required(),
});

export const createStack = async (stack: Partial<StackClass>, authorizedUser: UserClass): Promise<string> => {
  const data = await stackSchema.validate(stack);

  const id = uuid();

  await Stack.query().insertAndFetch({
    ...data,
    id: id,
    createdById: authorizedUser.id,
  });

  return id;
};

const updateSchema = object({
  name: string(),
});

export const updateStack = async (
  id: string | number,
  name: string,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const data = await updateSchema.validate({ name });

  const existingStack = await getStack(id);

  if (authorizedUser.id !== existingStack.createdById) {
    throw new AuthenticationError('You can only update stack if you are the creator.');
  }

  await Stack.query().patchAndFetchById(id, { name: data.name });

  return id;
};

export const tagToStack = async (
  stackId: string | number,
  channelId: string | number,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const existingStack = await getStack(stackId);

  if (authorizedUser.id !== existingStack.createdById) {
    throw new AuthenticationError('You can add tags to stack if you are the creator.');
  }

  const existingTag = await StackChannel.query().where({ stackId: stackId, channelId: channelId });

  if (existingTag.length !== 0) {
    await StackChannel.query().where({ stackId: stackId, channelId: channelId }).delete();
  } else {
    await StackChannel.query().insert({ stackId: stackId, channelId: channelId });
  }

  return channelId;
};
