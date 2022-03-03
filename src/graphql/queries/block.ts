import { gql } from 'apollo-server';
import { Block } from '../../models/Block';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a block by an id.
    """
    block(id: ID!): Block
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    block: async (_obj: null, args: Args) => await Block.query().findById(args.id).withGraphFetched('content')
  },
};

export default {
  typeDefs,
  resolvers,
};