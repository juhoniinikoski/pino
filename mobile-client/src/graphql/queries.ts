import { gql } from '@apollo/client';

export const GET_CHANNELS = gql`
  query Channels($first: Int, $after: String, $searchKeyword: String) {
    channels(first: $first, after: $after, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          name
          followedBy
          questions
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_USERS_CHANNELS = gql`
  query Channels($first: Int, $after: String, $searchKeyword: String) {
    channels(
      first: $first
      after: $after
      searchKeyword: $searchKeyword
      followedByAuthorized: true
    ) {
      edges {
        node {
          id
          name
          followedBy
          questions
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_QUESTIONS = gql`
  query Questions(
    $channelId: ID
    $stackId: ID
    $createdBy: ID
    $first: Int
    $after: String
  ) {
    questions(
      channelId: $channelId
      stackId: $stackId
      createdBy: $createdBy
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          question
          createdById
          type
          answers {
            answer
            correct
            id
          }
          updatedAt
          createdAt
        }
        cursor
      }
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_STACKS = gql`
  query Stacks(
    $public: Boolean
    $createdBy: ID
    $first: Int
    $after: String
    $searchKeyword: String
  ) {
    stacks(
      first: $first
      after: $after
      createdBy: $createdBy
      searchKeyword: $searchKeyword
      public: $public
    ) {
      totalCount
      edges {
        node {
          id
          name
          public
          questions
          followedBy
          createdById
          createdAt
          updatedAt
          tags {
            id
            name
          }
        }
        cursor
      }
    }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query authorizedUser {
    authorizedUser {
      id
      email
    }
  }
`;
