import { gql } from 'apollo-server';
import { getUsers } from '../../services/user/userService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns array of users.
    """
    users: [User]!
  }
`;

export const resolvers = {
  Query: {
    users: async () => getUsers(),
  },
};

export default {
  typeDefs,
  resolvers,
};
