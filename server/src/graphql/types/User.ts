import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
