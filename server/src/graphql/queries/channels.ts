import { gql } from 'apollo-server';
import { getChannels } from '../../services/channel/channelService';
import { Context } from '../../utils/entities';

export const typeDefs = gql`
  extend type Query {
    """
    Returns list of channels.
    """
    channels(first: Int, after: String, searchKeyword: String, followedByAuthorized: Boolean): ChannelConnection!
  }
`;

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  searchKeyword?: string;
  followedByAuthorized?: boolean;
}

export const resolvers = {
  Query: {
    channels: (_obj: null, args: Args, { authService }: Context) => getChannels(args, authService),
  },
};

export default {
  typeDefs,
  resolvers,
};
