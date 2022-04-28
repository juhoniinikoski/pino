import { gql } from 'apollo-server';
import { deleteAnswer } from '../../../services/answer/answerService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Deletes the channel which has the given id, if question related to it has enough other answers and it is made by the authorized user.
    """
    deleteAnswer(id: ID!): Boolean
  }
`;

interface Args {
  id: string | number;
}

export const resolvers = {
  Mutation: {
    deleteAnswer: async (_obj: null, args: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await deleteAnswer(args.id, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
