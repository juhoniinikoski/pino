import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Block {
    id: ID!
    createdById: String!
    type: String!
    title: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: [Block]
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
