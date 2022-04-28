import { gql } from 'apollo-server';
import { getAnswers } from '../../services/answer/answerService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns list of answers.
    """
    answers: [Answer!]
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    answers: async () => getAnswers(),
  },
};

export default {
  typeDefs,
  resolvers,
};
