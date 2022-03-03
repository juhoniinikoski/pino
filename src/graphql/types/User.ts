import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    savedBlocks(first: Int, after: String): [Block]
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
