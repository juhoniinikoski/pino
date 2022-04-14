import { gql } from 'apollo-server';
import { getChannel } from '../../services/channel/channelService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a stack and related questions.
    """
    channel(id: ID!): Channel!
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    stack: async (_obj: null, { id }: Args) => getChannel(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
