import { gql } from 'apollo-server';
import { updateBlock } from '../../../services/block/blockService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input UpdateBlockInput {
    type: String
    title: String
  }
  extend type Mutation {
    """
    Updates block attributes.
    """
    updateBlock(id: ID!, data: UpdateBlockInput): String
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
    updateBlock: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateBlock(args.id, args.data, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
