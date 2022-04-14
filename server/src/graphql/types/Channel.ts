import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Channel {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
