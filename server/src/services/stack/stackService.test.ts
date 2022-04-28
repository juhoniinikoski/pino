import StackClass from '../../models/Stack';
import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-return*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

interface EdgeType {
  cursor: string;
  node: StackClass;
}

const userStackQuery = {
  query: `
    query {
      stacks (createdBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        edges {
          node {
            id
            name
            questions
            public
            createdById
            followedBy
            tags {
              name
            }
          }
        }
      }
    }
  `,
};

const stackQuery = {
  query: `
    query {
      stack (id: "kauppis-yh1234") {
        id
        name
        questions
        public
        createdById
        followedBy
        tags {
          name
        }
      }
    }
  `,
};

const stackQuery2 = {
  query: `
    query {
      stack (id: "DIA20221234") {
        id
        name
        questions
        public
        followedBy
        createdById
        tags {
          name
        }
      }
    }
  `,
};

const publicQuery = {
  query: `
    query {
      stacks (public: true) {
        totalCount
        edges {
          node {
            id
            name
            questions
            followedBy
            public
            createdById
            tags {
              name
            }
          }
        }
      }
    }
  `,
};

const keywordQuery = {
  query: `
    query {
      stacks (searchKeyword: "kaupp") {
        totalCount
        edges {
          node {
            id
            name
            questions
            followedBy
            public
            createdById
            tags {
              name
            }
          }
        }
      }
    }
  `,
};

describe('testing stack read', () => {
  test('should return list of stacks created by specific user with number of questions included', async () => {
    const result = await testServer.executeOperation({ query: userStackQuery.query });
    return result.data.stacks.edges.forEach((edge: EdgeType) =>
      expect(edge.node.createdById).toBe('bbe42984-051b-4a01-b45d-b8d29c32200c'),
    );
  });
  test('should return one stack', async () => {
    const result = await testServer.executeOperation({ query: stackQuery.query });
    expect(result.data.stack.id).toBe('kauppis-yh1234');
    expect(result.data.stack.questions).toBe(3);
    return expect(result.data.stack.name).toBe('kauppis-yh');
  });

  test('should return list of public stacks', async () => {
    const result = await testServer.executeOperation({ query: publicQuery.query });
    expect(result.data.stacks.totalCount).toBe(2);
    return result.data.stacks.edges.forEach((edge: EdgeType) => expect(edge.node.public).toBe(true));
  });

  test('should return list of public stacks filtered with search keyword', async () => {
    const result = await testServer.executeOperation({ query: keywordQuery.query });
    expect(result.data.stacks.totalCount).toBe(1);
    return expect(result.data.stacks.edges[0].node.name).toBe('kauppis-yh');
  });
});

const createStackMutation = {
  mutation: `
    mutation {
      createStack(stack: {
        name: "testistack",
        public: true
      })
    }
  `,
};

const updateNameMutation = {
  mutation: `
    mutation {
      updateStack(
        id: "DIA20221234",
        name: "DIA-haku"
      )
    }
  `,
};

const updateNameMutation2 = {
  mutation: `
    mutation {
      updateStack(
        id: "yofysiikka1234",
        name: "yofyssa"
      )
    }
  `,
};

const tagToStack = {
  mutation: `
    mutation {
      tagToStack(
        stackId: "kauppis-yh1234",
        channelId: "kauppikseen1234"
      )
    }
  `,
};

const deleteStack = {
  mutation: `
    mutation {
      deleteStack(
        id: "yomatematiikka1234"
      )
    }
  `,
};

const deleteStackUnable = {
  mutation: `
    mutation {
      deleteStack(
        id: "yofysiikka1234"
      )
    }
  `,
};

describe('testing stack mutations', () => {
  test('should create a new, empty stack', async () => {
    const initialStacks = await testServer.executeOperation({ query: publicQuery.query });
    await testServer.executeOperation({ query: createStackMutation.mutation });
    const resultStacks = await testServer.executeOperation({ query: publicQuery.query });
    return expect(initialStacks.data.stacks.totalCount).toBe(resultStacks.data.stacks.totalCount - 1);
  });

  test('should change the name of the stack', async () => {
    await testServer.executeOperation({ query: updateNameMutation.mutation });
    const resultStack = await testServer.executeOperation({ query: stackQuery2.query });
    return expect(resultStack.data.stack.name).toBe('DIA-haku');
  });

  test("shouldn't change the name of the stack as it isn't made by the authorized user", async () => {
    const mutation = await testServer.executeOperation({ query: updateNameMutation2.mutation });
    return expect(mutation.errors[0].message).toBe('You can only update stack if you are the creator.');
  });

  test('should be able to add tags to stack', async () => {
    await testServer.executeOperation({ query: tagToStack.mutation });
    const result = await testServer.executeOperation({ query: stackQuery.query });
    return expect(result.data.stack.tags.length).toBe(1);
  });

  test('should remove the tag from stack', async () => {
    await testServer.executeOperation({ query: tagToStack.mutation });
    const result = await testServer.executeOperation({ query: stackQuery.query });
    return expect(result.data.stack.tags.length).toBe(0);
  });

  test('should delete the stack', async () => {
    const initial = await testServer.executeOperation({ query: publicQuery.query });
    await testServer.executeOperation({ query: deleteStack.mutation });
    const result = await testServer.executeOperation({ query: publicQuery.query });
    return expect(result.data.stacks.edges.length).toBe(initial.data.stacks.edges.length - 1);
  });

  test("shouldn't delete the stack if it's not made by authorized user", async () => {
    const initial = await testServer.executeOperation({ query: publicQuery.query });
    const mutation = await testServer.executeOperation({ query: deleteStackUnable.mutation });
    const result = await testServer.executeOperation({ query: publicQuery.query });
    expect(mutation.errors[0].message).toBe('You can only delete the stack if you have made it.');
    return expect(result.data.stacks.edges.length).toBe(initial.data.stacks.edges.length);
  });
});
