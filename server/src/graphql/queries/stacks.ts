import { gql } from 'apollo-server';
import { getStacks } from '../../services/stack/stackService';
import { Context } from '../../utils/entities';

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
      followedByAuthorized: Boolean
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
  followedByAuthorized?: boolean;
}

export const resolvers = {
  Query: {
    stacks: (_obj: null, args: Args, { authService }: Context) => getStacks(args, authService),
  },
};

export default {
  typeDefs,
  resolvers,
};
