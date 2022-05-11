import { gql } from 'apollo-server';
import { getQuestions } from '../../services/question/questionService';

export const typeDefs = gql`
  extend type Query {
    """
    Returns questions related to given params.
    """
    questions(
      first: Int
      after: String
      orderBy: String
      createdBy: ID
      collectionId: ID
    ): QuestionConnection!
  }
`;

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  createdBy?: number | string;
  collectionId?: string | number
}

export const resolvers = {
  Query: {
    questions: (_obj: null, args: Args) => getQuestions(args),
  },
};

export default {
  typeDefs,
  resolvers,
};
