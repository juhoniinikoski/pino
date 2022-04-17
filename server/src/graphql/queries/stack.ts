import { gql } from 'apollo-server';
import { getStack } from '../../services/stack/stackService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a stack.
    """
    stack(id: ID!): Stack
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    stack: async (_obj: null, { id }: Args) => getStack(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
