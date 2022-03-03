import { gql } from 'apollo-server';
import { updateUser } from '../../../services/user/userService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input UpdateUserInput {
    id: ID
    username: String
    email: String
  }
  extend type Mutation {
    """
    Creates a new user, if the provided username does not already exist.
    """
    updateUser(id: ID!, data: UpdateUserInput): String
  }
`;

interface Args {
  id: string | number;
  data: {
    username: string;
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
