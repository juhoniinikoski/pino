import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Question {
    id: ID!
    question: String!
    type: String!
    createdById: ID!
    answers: [Answer]!
    createdAt: DateTime!
    updatedAt: DateTime!
    channels: [Channel]
    stacks: [Stack]
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
