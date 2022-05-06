import { gql } from 'apollo-server';
import { getAnswer } from '../../services/answer/answerService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns an answer.
    """
    answer(id: ID!): Answer!
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Query: {
    answer: (_obj: null, { id }: Args) => getAnswer(id),
  },
};

export default {
  typeDefs,
  resolvers,
};
