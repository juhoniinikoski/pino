import { gql } from 'apollo-server';
import { deleteQuestion } from '../../../services/question/questionService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the question which has the given id, if it's made by the current authorized user.
    """
    deleteQuestion(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Mutation: {
    deleteQuestion: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteQuestion(args.id, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
