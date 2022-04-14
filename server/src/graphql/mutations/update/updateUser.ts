import { gql } from 'apollo-server';
import { updateUser } from '../../../services/user/userService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input UpdateUserInput {
    id: ID
    email: String
  }
  extend type Mutation {
    """
    Updates a user, if the provided email does not already exist.
    """
    updateUser(id: ID!, data: UpdateUserInput): String
  }
`;

interface Args {
  id: string | number;
  data: {
    email: string;
    id: string | number;
  };
}

export const resolvers = {
  Mutation: {
    updateUser: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateUser(args.id, args.data, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
