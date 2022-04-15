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
      stackId: ID
      channelId: ID
    ): QuestionConnection!
  }
`;

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  createdBy?: number | string;
  stackId?: number | string;
  channelId?: number | string;
}

export const resolvers = {
  Query: {
    questions: async (_obj: null, args: Args) => await getQuestions(args),
  },
};

export default {
  typeDefs,
  resolvers,
};
