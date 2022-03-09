import { gql } from 'apollo-server';
import { getBlocks } from '../../services/block/blockService';
import { Context } from '../../utils/entities';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of workspace blocks.
    """
    blocks: [Block]!
  }
`;

export const resolvers = {
  Query: {
    blocks: async (_obj: null, _args: null, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await getBlocks(authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
