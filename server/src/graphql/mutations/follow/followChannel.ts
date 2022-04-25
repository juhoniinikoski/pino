import { gql } from 'apollo-server';
import { followChannel } from '../../../services/user/userService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Adds tag to stack, if it's made by athorized user.
    """
    followChannel(channelId: ID!): String
  }
`;

interface Args {
  channelId: string | number;
}

export const resolvers = {
  Mutation: {
    followChannel: async (_obj: null, { channelId }: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await followChannel(channelId, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
