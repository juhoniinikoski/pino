import { gql } from 'apollo-server';
import { createBlock } from '../../../services/block/blockService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input CreateBlockInput {
    type: String!
    title: String!
    parentId: String
  }
  extend type Mutation {
    """
    Creates a new block.
    """
    createBlock(block: CreateBlockInput): String
  }
`;

interface Args {
  block: {
    type: string;
    title: string;
  };
}

export const resolvers = {
  Mutation: {
    createBlock: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createBlock(args.block, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
