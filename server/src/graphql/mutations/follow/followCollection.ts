import { gql } from 'apollo-server';
import { followCollection } from '../../../services/user/userService';
import { Context } from '../../../utils/entities';

export const typeDefs = gql`
  extend type Mutation {
    """
    Follows collection, whether it is channel or stack.
    """
    followCollection(collectionId: ID!): String
  }
`;

interface Args {
  collectionId: string | number;
}

export const resolvers = {
  Mutation: {
    followCollection: async (_obj: null, { collectionId }: Args, { authService }: Context) => {
      const authorizedUser = await authService.getAuthorizedUserOrFail();
      return await followCollection(collectionId, authorizedUser);
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
