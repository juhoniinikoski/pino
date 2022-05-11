import { boolean, number, object, string } from 'yup';
import CollectionClass, { Collection } from '../../models/Collection';
import UserClass from '../../models/User';
import { PageInfoType } from '../../utils/entities';
import { v4 as uuid } from 'uuid';
import { AuthenticationError } from 'apollo-server';
import { InvalidIdError } from '../errors';
import AuthService from '../authentication/authService';
import { UserCollection } from '../../models/UserCollection';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  createdBy?: number | string;
  public?: boolean;
  followedByAutohrized?: boolean
}

interface EdgeType {
  cursor: string;
  node: CollectionClass;
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
  orderBy: string().default('createdAt'),
  searchKeyword: string().trim(),
  createdBy: string().trim(),
  public: boolean(),
  followedByAuthorized: boolean()
});

const getLikeFilter = (value: string) => `%${value}%`;

export const getStacks = async (args: Args, authService: AuthService): Promise<StackConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, after, orderBy, searchKeyword, createdBy, public: publicStack, followedByAuthorized } = normalizedArgs;

  let query = Collection.query().where({type: 'stack'});

  if (followedByAuthorized) {
    const user = await authService.getAuthorizedUserOrFail();
    query = query
      .where('id', 'in', UserCollection.query().where('userId', user.id).select('collectionId'))
      .select(
        '*',
        Collection.relatedQuery('followedBy').where('userId', user.id).select('createdAt').as('connectionDate'),
      );
  }

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

  query = query.select(
    '*',
    Collection.relatedQuery('questions').count().as('questions'),
    Collection.relatedQuery('followedBy').count().as('followedBy'),
  );

  return await query.cursorPaginateStack(count, {
    first,
    after,
    orderBy: [{ column: orderBy, order: orderDirection.toLowerCase() }, 'id'],
  });
};

export const getStack = async (id: string | number): Promise<CollectionClass> =>
  await Collection.query()
    .findById(id)
    .select(
      '*',
      Collection.relatedQuery('questions').count().as('questions'),
      Collection.relatedQuery('followedBy').count().as('followedBy'),
    )

const stackSchema = object({
  name: string().required(),
  public: boolean().required(),
});

export const createStack = async (stack: Partial<CollectionClass>, authorizedUser: UserClass): Promise<string> => {
  const data = await stackSchema.validate(stack);

  const id = uuid();

  await Collection.query().insertAndFetch({
    ...data,
    id: id,
    type: 'stack',
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

  await Collection.query().patchAndFetchById(id, { name: data.name });

  return id;
};

export const deleteStack = async (id: string | number, authorizedUser: UserClass): Promise<boolean> => {
  const stack = await Collection.query().findById(id);

  if (authorizedUser.id === stack.createdById) {
    const res = await Collection.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteStack');
    }
    return true;
  }

  throw new AuthenticationError('You can only delete the stack if you have made it.');
};
