import { gql } from 'apollo-server';
import { getUser } from '../../services/user/userService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an user by an id.
    """
    user(id: ID!): User
  }
`;

interface Args {
  id: number | string;
}

export const resolvers = {
  Query: {
    user: async (_obj: null, args: Args) => await getUser(args.id),
  },
};

export default {
  typeDefs,
  resolvers,
};
