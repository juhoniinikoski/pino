import { gql } from 'apollo-server';

export const typeDefs = gql`
  type ChannelEdge {
    cursor: String!
    node: Channel!
  }
  type ChannelConnection {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [ChannelEdge!]!
  }
`;

export const resolvers = {};

export default {
  typeDefs,
  resolvers,
};
