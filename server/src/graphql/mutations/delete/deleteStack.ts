import { gql } from 'apollo-server';
import { deleteStack } from '../../../services/stack/stackService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the stack which has the given id, if it's made by the current authorized user.
    """
    deleteStack(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Mutation: {
    deleteStack: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteStack(args.id, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
