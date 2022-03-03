import { gql } from 'apollo-server';
import { moveBlock } from '../../../services/block/blockService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input MoveBlockInput {
    id: ID!
    oldParent: ID!
    newParent: ID!
  }
  extend type Mutation {
    """
    Moves block under new parent.
    """
    moveBlock(data: MoveBlockInput): String
  }
`;

interface Args {
  data: {
    id: string | number;
    oldParent: string | number;
    newParent: string | number;
  };
}

export const resolvers = {
  Mutation: {
    moveBlock: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await moveBlock(args.data, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
