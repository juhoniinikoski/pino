import { number, object, string } from 'yup';
import ChannelClass, { Channel } from '../../models/Channel';
import { PageInfoType } from '../../utils/entities';
import { v4 as uuid } from 'uuid';
import { ApolloError } from 'apollo-server';
import { InvalidIdError } from '../errors';
import { QuestionChannel } from '../../models/QuestionChannel';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
}

interface EdgeType {
  cursor: string;
  node: ChannelClass;
}

interface ChannelConnection {
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
});

export const getChannel = async (id: string | number): Promise<ChannelClass> =>
  await Channel.query()
    .findById(id)
    .select(
      '*',
      Channel.relatedQuery('questions').count().as('questions'),
      Channel.relatedQuery('followedBy').count().as('followedBy'),
    );

const getLikeFilter = (value: string) => `%${value}%`;

export const getChannels = async (args: Args): Promise<ChannelConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, after, searchKeyword } = normalizedArgs;

  let query = Channel.query();

  if (searchKeyword) {
    const likeFilter = getLikeFilter(searchKeyword);

    query = query.where((qb) => {
      return qb.where('name', 'like', likeFilter);
    });
  }

  const count = query.clone();

  query = query.select(
    '*',
    Channel.relatedQuery('questions').count().as('questions'),
    Channel.relatedQuery('followedBy').count().as('followedBy'),
  );

  return await query.cursorPaginate(count, {
    first,
    after,
    orderBy: [{ column: 'createdAt', order: orderDirection.toLowerCase() }, 'id'],
  });
};

const channelSchema = object({
  name: string().required(),
});

export const createChannel = async (channel: Partial<ChannelClass>): Promise<string> => {
  const data = await channelSchema.validate(channel);

  const existingChannel = await Channel.query().where({ name: data.name });

  if (existingChannel.length !== 0) {
    throw new ApolloError('channel with given name already exists');
  }

  const id = uuid();

  await Channel.query().insertAndFetch({
    ...data,
    id: id,
  });

  return id;
};

export const deleteChannel = async (id: string | number): Promise<boolean> => {
  const questions = await QuestionChannel.query().where({ channelId: id });

  if (questions.length === 0) {
    const res = await Channel.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteChannel');
    }
    return true;
  }

  throw new ApolloError('You can only delete the channel if it has no questions.');
};
