import { gql } from 'apollo-server';
import AnswerClass from '../../../models/Answer';
import { createQuestion } from '../../../services/question/questionService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input AnswerType {
    answer: String!
      correct: Boolean!
  }
  input CreateQuestionInput {
    question: String!
    type: String!
    publish: Boolean!
    answers: [AnswerType]!
  }
  extend type Mutation {
    """
    Creates a new question.
    """
    createQuestion(question: CreateQuestionInput): String
  }
`;

interface Args {
  question: {
    question: string;
    type: string;
    publish: boolean
    answers: Partial<AnswerClass>[]
  };
}

export const resolvers = {
  Mutation: {
    createQuestion: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await createQuestion(args.question, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
