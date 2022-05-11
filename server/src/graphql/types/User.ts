import { gql } from 'apollo-server';
import CollectionClass from '../../models/Collection';

export const typeDefs = gql`
  union Collection = Stack | Channel
  type User {
    id: ID!
    email: String!
    followedCollections: [Collection]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers = {
  Collection: {
    __resolveType: (collection: CollectionClass) => {
      if (collection.type === 'channel') {
        return 'Channel';
      } else return 'Stack';
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
