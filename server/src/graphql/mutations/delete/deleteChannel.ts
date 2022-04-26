import { gql } from 'apollo-server';
import { deleteChannel } from '../../../services/channel/channelService';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the channel which has the given id, if it has no related questions.
    """
    deleteChannel(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Mutation: {
    deleteChannel: async (_obj: null, args: Args) => {
      return await deleteChannel(args.id);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
