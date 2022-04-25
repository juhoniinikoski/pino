import { gql } from 'apollo-server';
import StackClass from '../../models/Stack';

export const typeDefs = gql`
  type Stack {
    id: ID!
    name: String!
    questions: Int!
    public: Boolean!
    tags: [Channel]
    createdById: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers = {
  Stack: {
    public: (obj: StackClass) => {
      return obj.public === 'true' ? true : false;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
