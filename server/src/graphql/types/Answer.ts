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

export const resolvers = {
  Answer: {
    correct: (obj: AnswerClass) => {
      if (obj.correct === 'true') {
        return true;
      } else return false;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
