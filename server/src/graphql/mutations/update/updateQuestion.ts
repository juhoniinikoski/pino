import { gql } from 'apollo-server';
import { updateQuestion } from '../../../services/question/questionService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input UpdateQuestionInput {
    id: ID
    question: String
    type: String
  }
  extend type Mutation {
    """
    Updates a question, if it's made by athorized user.
    """
    updateQuestion(data: UpdateQuestionInput): String
  }
`;

interface Args {
  data: {
    question: string;
    type: string;
    id: string | number;
  };
}

export const resolvers = {
  Mutation: {
    updateQuestion: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateQuestion(args.data, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
