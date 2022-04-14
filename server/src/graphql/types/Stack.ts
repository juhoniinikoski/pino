import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Stack {
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
