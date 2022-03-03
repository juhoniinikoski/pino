import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import Block from './types/Block';
import User from './types/User';
import DateTime from './scalars/DateTime';

import UserQuery from './queries/user';
import UsersQuery from './queries/users';
import BlockQuery from './queries/block';

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
  rootTypeDefs,
  Block.typeDefs,
  User.typeDefs,
  DateTime.typeDefs,
  UserQuery.typeDefs,
  UsersQuery.typeDefs,
  BlockQuery.typeDefs
];

const resolvers = merge(
  Block.resolvers,
  User.resolvers,
  DateTime.resolvers,
  UserQuery.resolvers,
  UsersQuery.resolvers,
  BlockQuery.resolvers
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;