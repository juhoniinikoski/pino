import { gql } from 'apollo-server';
import { updateStack } from '../../../services/stack/stackService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Updates a user, if the provided email does not already exist.
    """
    updateStack(id: ID!, name: String): String
  }
`;

interface Args {
  id: string | number;
  name: string;
}

export const resolvers = {
  Mutation: {
    updateStack: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateStack(args.id, args.name, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
