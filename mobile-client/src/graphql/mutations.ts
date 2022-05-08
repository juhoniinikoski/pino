import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation authorize($email: String!, $password: String!) {
    authorize(credentials: { email: $email, password: $password }) {
      accessToken
    }
  }
`;

export const FOLLOW_CHANNEL = gql`
  mutation followChannel($channelId: ID!) {
    followChannel(channelId: $channelId)
  }
`;
