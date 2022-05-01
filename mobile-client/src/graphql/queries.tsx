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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;
