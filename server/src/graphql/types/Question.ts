import { gql } from 'apollo-server';
import CollectionClass from '../../models/Collection';

export const typeDefs = gql`
  union Collection = Stack | Channel
  type Question {
    id: ID!
    question: String!
    type: String!
    createdById: ID!
    answers: [Answer]!
    createdAt: DateTime!
    updatedAt: DateTime!
    collections: [Collection]
  }
`;

export const resolvers = {
  Collection: {
    __resolveType: (collection: CollectionClass) => {
      if (collection.type === 'channel') {
        return 'Channel'
      } else return 'Stack'
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
