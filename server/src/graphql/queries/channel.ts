import { gql } from 'apollo-server';
import { getChannel } from '../../services/channel/channelService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a channel.
    """
    channel(id: ID!): Channel!
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    channel: async (_obj: null, { id }: Args) => getChannel(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
