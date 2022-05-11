import { boolean, number, object, string } from 'yup';
import { PageInfoType } from '../../utils/entities';
import { v4 as uuid } from 'uuid';
import { ApolloError } from 'apollo-server';
import { InvalidIdError } from '../errors';
import AuthService from '../authentication/authService';
import { UserCollection } from '../../models/UserCollection';
import CollectionClass from '../../models/Collection';
import { Collection } from '../../models/Collection';
import { QuestionCollection } from '../../models/QuestionCollection';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  followedByAuthorized?: boolean;
}

interface EdgeType {
  cursor: string;
  node: CollectionClass;
}

interface ChannelConnection {
  totalCount: number;
  pageInfo: PageInfoType;
  edges: EdgeType[];
}

const argsSchema = object({
  after: string(),
  first: number().min(1).max(30).default(30),
  orderDirection: string().default('desc'),
  orderBy: string().default('createdAt'),
  searchKeyword: string().trim(),
  followedByAuthorized: boolean(),
});

export const getChannel = async (id: string | number): Promise<CollectionClass> =>
  await Collection.query()
    .findById(id)
    .select(
      '*',
      Collection.relatedQuery('questions').count().as('questions'),
      Collection.relatedQuery('followedBy').count().as('followedBy'),
    );

const getLikeFilter = (value: string) => `%${value}%`;

export const getChannels = async (args: Args, authService: AuthService): Promise<ChannelConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, orderBy, after, searchKeyword, followedByAuthorized } = normalizedArgs;

  let query = Collection.query().where({ type: 'channel' });

  if (followedByAuthorized) {
    const user = await authService.getAuthorizedUserOrFail();
    query = query
      .where('id', 'in', UserCollection.query().where('userId', user.id).select('channelId'))
      .select(
        '*',
        Collection.relatedQuery('followedBy').where('userId', user.id).select('createdAt').as('connectionDate'),
      );
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

  return await query.cursorPaginate(count, {
    first,
    after,
    orderBy: [{ column: orderBy, order: orderDirection.toLowerCase() }, 'id'],
  });
};

const channelSchema = object({
  name: string().required(),
});

export const createChannel = async (channel: Partial<CollectionClass>): Promise<string> => {
  const data = await channelSchema.validate(channel);

  const existingChannel = await Collection.query().where({ name: data.name });

  if (existingChannel.length !== 0) {
    throw new ApolloError('channel with given name already exists');
  }

  const id = uuid();

  await Collection.query().insertAndFetch({
    ...data,
    type: 'channel',
    id: id,
  });

  return id;
};

export const deleteChannel = async (id: string | number): Promise<boolean> => {
  const questions = await QuestionCollection.query().where({ collectionId: id });

  if (questions.length === 0) {
    const res = await Collection.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteChannel');
    }
    return true;
  }

  throw new ApolloError('You can only delete the channel if it has no questions.');
};
