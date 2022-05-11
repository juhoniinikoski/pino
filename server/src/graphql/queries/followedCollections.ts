import { gql } from 'apollo-server';
import { getFollowed } from '../../services/followed/followedService';
import { Context } from '../../utils/entities';

export const typeDefs = gql`
  extend type Query {
    """
    Returns list of followed channels and stacks.
    """
    followedCollections(first: Int, after: String, searchKeyword: String, orderBy: String): CollectionConnection!
  }
`;

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  searchKeyword?: string;
}

export const resolvers = {
  Query: {
    followedCollections: (_obj: null, args: Args, { authService }: Context) => getFollowed(args, authService),
  },
};

export default {
  typeDefs,
  resolvers,
};
