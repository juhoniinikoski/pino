import { gql } from 'apollo-server';
import { createChannel } from '../../../services/channel/channelService';

export const typeDefs = gql`
  input CreateChannelInput {
    name: String!
  }
  extend type Mutation {
    """
    Creates a new channel.
    """
    createChannel(channel: CreateChannelInput): String
  }
`;

interface Args {
  channel: {
    name: string;
  };
}

export const resolvers = {
  Mutation: {
    createChannel: async (_obj: null, args: Args) => {
      return await createChannel(args.channel);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
