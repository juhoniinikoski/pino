import { gql } from 'apollo-server';
import { getStacks } from '../../services/stack/stackService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns list of stacks.
    """
    stacks(
      first: Int
      after: String
      orderBy: String
      public: Boolean
      createdBy: ID
      searchKeyword: String
    ): StackConnection!
  }
`;

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  public?: boolean;
  createdBy?: number | string;
  searchKeyword?: string;
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
