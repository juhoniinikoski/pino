import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation authorize($email: String!, $password: String!) {
    authorize(credentials: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export const FOLLOW_COLLECTION = gql`
  mutation followCollection($collectionId: ID!) {
    followCollection(collectionId: $collectionId)
  }
`;
