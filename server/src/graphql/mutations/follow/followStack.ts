import { gql } from 'apollo-server';
import { followStack } from '../../../services/user/userService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Adds tag to stack, if it's made by athorized user.
    """
    followStack(stackId: ID!): String
  }
`;

interface Args {
  stackId: string | number;
}

export const resolvers = {
  Mutation: {
    followStack: async (_obj: null, { stackId }: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await followStack(stackId, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
