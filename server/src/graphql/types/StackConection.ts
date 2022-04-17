import { gql } from 'apollo-server';

export const typeDefs = gql`
  type StackEdge {
    cursor: String!
    node: Stack!
  }
  type StackConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [StackEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
