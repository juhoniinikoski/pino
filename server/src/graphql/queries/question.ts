import { gql } from 'apollo-server';
import { getQuestion } from '../../services/question/questionService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns a question.
    """
    question(id: ID!): Question!
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    question: async (_obj: null, { id }: Args) => getQuestion(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
