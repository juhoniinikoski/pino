import { gql } from 'apollo-server';
import { updateAnswer } from '../../../services/answer/answerService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  input UpdateAnswerInput {
    answer: String
    correct: Boolean
  }
  extend type Mutation {
    """
    Updates an answer, if questino related to it is made by athorized user.
    """
    updateAnswer(id: ID!, data: UpdateAnswerInput): String
  }
`;

interface Args {
  id: string | number;
  data: {
    answer: string;
    correct: boolean;
  };
}

export const resolvers = {
  Mutation: {
    updateAnswer: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await updateAnswer(args.id, args.data, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
