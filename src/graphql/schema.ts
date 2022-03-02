import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

/* eslint-disable  @typescript-eslint/no-unsafe-assignment */

const rootTypeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs
];

// const resolvers = merge(
  
// );

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;