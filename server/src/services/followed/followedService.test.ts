import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-return*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

const followedQuery = {
  query: `
    query {
      followedCollections {
        totalCount
        edges {
          node {
            ... on Stack {
              id
              name
              questions
              followedBy
            }
            ... on Channel {
              id
              name
              questions
              followedBy
            }
          }
        }
      }
    }
  `,
};

describe('fetch tests', () => {
  test('should get followed stacks and channels of authorized user', async () => {
    const result = await testServer.executeOperation({ query: followedQuery.query });
    return expect(result.data.followedCollections).toBeDefined();
  });
});
