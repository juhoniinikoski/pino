import { gql } from 'apollo-server';
import { tagToStack } from '../../../services/stack/stackService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Adds tag to stack, if it's made by athorized user.
    """
    tagToStack(stackId: ID!, channelId: ID!): String
  }
`;

interface Args {
  stackId: string | number;
  channelId: string | number;
}

export const resolvers = {
  Mutation: {
    tagToStack: async (_obj: null, { stackId, channelId }: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await tagToStack(stackId, channelId, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
