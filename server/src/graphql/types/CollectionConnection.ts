import { gql } from 'apollo-server';

export const typeDefs = gql`
  union Collection = Stack | Channel
  type CollectionEdge {
    cursor: String!
    node: Collection!
  }
  type CollectionConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [CollectionEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
