import { gql } from 'apollo-server';
import { User } from '../../models/User';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an user by an id.
    """
    user(id: ID!): User
  }
`;

interface Args {
  id: number | string
}

export const resolvers = {
  Query: {
    user: async (_obj: null, args: Args) => await User.query().findById(args.id)
  },
};

export default {
  typeDefs,
  resolvers,
};