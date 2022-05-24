import { gql } from 'apollo-server';
import AnswerClass from '../../models/Answer';

export const typeDefs = gql`
  type Answer {
    id: ID!
    questionId: ID!
    answer: String!
    correct: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
