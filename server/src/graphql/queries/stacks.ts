import { gql } from 'apollo-server';
import { getStacks } from '../../services/stack/stackService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a stack and related questions.
    """
    stacks(first: Int, after: String, orderBy: String, public: Boolean, createdBy: ID): [Stack]!
  }
`;

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  public?: boolean;
  createdBy?: number | string;
}

export const resolvers = {
  Query: {
    stacks: async (_obj: null, args: Args) => getStacks(args),
  },
};

export default {
  typeDefs,
  resolvers,
};
