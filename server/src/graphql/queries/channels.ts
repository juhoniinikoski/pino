import { gql } from 'apollo-server';
import { getChannels } from '../../services/channel/channelService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a stack and related questions.
    """
    channels(first: Int, after: String, searchKeyword: String): StackConnection!
  }
`;

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  searchKeyword?: string;
}

export const resolvers = {
  Query: {
    channels: async (_obj: null, args: Args) => getChannels(args),
  },
};

export default {
  typeDefs,
  resolvers,
};
