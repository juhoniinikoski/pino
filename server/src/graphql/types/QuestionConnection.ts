import { gql } from 'apollo-server';

export const typeDefs = gql`
  type QuestionEdge {
    cursor: String!
    node: Question!
  }
  type QuestionConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [QuestionEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
