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

export const GET_FOLLOWED = gql`
  query FollowedCollections(
    $first: Int
    $after: String
    $searchKeyword: String
  ) {
    followedCollections(
      first: $first
      after: $after
      searchKeyword: $searchKeyword
      orderBy: "connectionDate"
    ) {
      edges {
        node {
          ... on Stack {
            id
            name
            followedBy
            questions
            connectionDate
            createdById
          }
          ... on Channel {
            id
            name
            followedBy
            questions
            connectionDate
          }
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
    $collectionId: ID
    $createdBy: ID
    $first: Int
    $after: String
  ) {
    questions(
      collectionId: $collectionId
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

export const GET_AUTHORIZED_USER = gql`
  query AuthorizedUser {
    authorizedUser {
      id
      email
    }
  }
`;
