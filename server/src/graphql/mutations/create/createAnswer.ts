import { gql } from 'apollo-server';
import { createAnswer } from '../../../services/answer/answerService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input CreateAnswerInput {
    answer: String!
    correct: Boolean!
    questionId: ID!
  }
  extend type Mutation {
    """
    Creates a new answer.
    """
    createAnswer(answer: CreateAnswerInput): String
  }
`;

interface Args {
  answer: {
    answer: string;
    correct: boolean;
    questionId: string | number;
  };
}

export const resolvers = {
  Mutation: {
    createAnswer: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createAnswer(args.answer, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
