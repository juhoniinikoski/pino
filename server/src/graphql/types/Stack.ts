import { gql } from 'apollo-server';
import CollectionClass from '../../models/Collection';

export const typeDefs = gql`
  type Stack {
    id: ID!
    name: String!
    questions: Int!
    followedBy: Int!
    public: Boolean!
    createdById: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    connectionDate: DateTime
  }
`;

export const resolvers = {
  Stack: {
    public: (obj: CollectionClass) => {
      return obj.public === 'true' ? true : false;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
