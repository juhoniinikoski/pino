import { gql } from 'apollo-server';
import { getBlock } from '../../services/block/blockService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a block by an id.
    """
    block(id: ID!): Block
  }
`;

interface Args {
  id: number | string;
}

export const resolvers = {
  Query: {
    block: async (_obj: null, args: Args) => await getBlock(args.id),
  },
};

export default {
  typeDefs,
  resolvers,
};
