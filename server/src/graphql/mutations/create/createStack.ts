import { gql } from 'apollo-server';
import { createStack } from '../../../services/stack/stackService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input CreateStackInput {
    name: String!
    public: Boolean!
  }
  extend type Mutation {
    """
    Creates a new stack.
    """
    createStack(stack: CreateStackInput): String
  }
`;

interface Args {
  stack: {
    name: string;
    public: boolean;
  };
}

export const resolvers = {
  Mutation: {
    createStack: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createStack(args.stack, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
