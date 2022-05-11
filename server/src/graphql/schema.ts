import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

import User from './types/User';
import Question from './types/Question';
import Answer from './types/Answer';
import Channel from './types/Channel';
import Stack from './types/Stack';
import DateTime from './scalars/DateTime';

import QuestionConnection from './types/QuestionConnection';
import StackConection from './types/StackConection';
import ChannelConnection from './types/ChannelConnection';
import CollectionConnection from './types/CollectionConnection';

import UserQuery from './queries/user';
import UsersQuery from './queries/users';
import StackQuery from './queries/stack';
import StacksQuery from './queries/stacks';
import QuestionQuery from './queries/question';
import QuestionsQuery from './queries/questions';
import ChannelQuery from './queries/channel';
import ChannelsQuery from './queries/channels';
import AnswerQuery from './queries/answer';
import AnswersQuery from './queries/answers';
import AuthorizedUserQuery from './queries/authorizedUser';
import FollowedCollectionsQuery from './queries/followedCollections';

import CreateUser from './mutations/create/createUser';
import CreateQuestion from './mutations/create/createQuestion';
import CreateStack from './mutations/create/createStack';
import CreateChannel from './mutations/create/createChannel';
import CreateAnswer from './mutations/create/createAnswer';

import UpdateUser from './mutations/update/updateUser';
import UpdateQuestion from './mutations/update/updateQuestion';
import UpdateStack from './mutations/update/updateStack';
import UpdateAnswer from './mutations/update/updateAnswer';

import FollowCollection from './mutations/follow/followCollection';

import DeleteUser from './mutations/delete/deleteUser';
import DeleteQuestion from './mutations/delete/deleteQuestion';
import DeleteStack from './mutations/delete/deleteStack';
import DeleteChannel from './mutations/delete/deleteChannel';
import DeleteAnswer from './mutations/delete/deleteAnswer';

import Authorize from './mutations/authorize';
import PageInfo from './types/PageInfo';

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
  User.typeDefs,
  DateTime.typeDefs,
  UserQuery.typeDefs,
  UsersQuery.typeDefs,
  CreateUser.typeDefs,
  UpdateUser.typeDefs,
  Authorize.typeDefs,
  DeleteUser.typeDefs,
  Question.typeDefs,
  Answer.typeDefs,
  Channel.typeDefs,
  Stack.typeDefs,
  StacksQuery.typeDefs,
  QuestionsQuery.typeDefs,
  CreateQuestion.typeDefs,
  UpdateQuestion.typeDefs,
  DeleteQuestion.typeDefs,
  PageInfo.typeDefs,
  QuestionConnection.typeDefs,
  QuestionQuery.typeDefs,
  StackConection.typeDefs,
  StackQuery.typeDefs,
  CreateStack.typeDefs,
  UpdateStack.typeDefs,
  FollowCollection.typeDefs,
  DeleteStack.typeDefs,
  ChannelConnection.typeDefs,
  ChannelsQuery.typeDefs,
  ChannelQuery.typeDefs,
  CreateChannel.typeDefs,
  DeleteChannel.typeDefs,
  DeleteAnswer.typeDefs,
  UpdateAnswer.typeDefs,
  AnswerQuery.typeDefs,
  AnswersQuery.typeDefs,
  CreateAnswer.typeDefs,
  AuthorizedUserQuery.typeDefs,
  CollectionConnection.typeDefs,
  FollowedCollectionsQuery.typeDefs,
];

const resolvers = merge(
  User.resolvers,
  DateTime.resolvers,
  UserQuery.resolvers,
  UsersQuery.resolvers,
  CreateUser.resolvers,
  UpdateUser.resolvers,
  Authorize.resolvers,
  DeleteUser.resolvers,
  Question.resolvers,
  Answer.resolvers,
  Channel.resolvers,
  Stack.resolvers,
  StacksQuery.resolvers,
  QuestionsQuery.resolvers,
  CreateQuestion.resolvers,
  UpdateQuestion.resolvers,
  DeleteQuestion.resolvers,
  PageInfo.resolvers,
  QuestionConnection.resolvers,
  QuestionQuery.resolvers,
  StackConection.resolvers,
  StackQuery.resolvers,
  CreateStack.resolvers,
  UpdateStack.resolvers,
  FollowCollection.resolvers,
  DeleteStack.resolvers,
  ChannelConnection.resolvers,
  ChannelsQuery.resolvers,
  ChannelQuery.resolvers,
  CreateChannel.resolvers,
  DeleteChannel.resolvers,
  DeleteAnswer.resolvers,
  UpdateAnswer.resolvers,
  AnswerQuery.resolvers,
  AnswersQuery.resolvers,
  CreateAnswer.resolvers,
  AuthorizedUserQuery.resolvers,
  CollectionConnection.resolvers,
  FollowedCollectionsQuery.resolvers,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
