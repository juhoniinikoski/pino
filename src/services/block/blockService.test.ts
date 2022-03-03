import BlockClass from '../../models/Block';
import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

const workspaceQuery = {
  query: `
    query {
      blocks {
        id
        title
        createdById
        content {
          id
          title
        }
      }
    }
  `,
};

const blockByIdQuery = {
  query: `
    query {
      block(id: "index1") {
        id
        title
        content {
          id
          title
        }
      }
    }
  `,
};

const blockByIdQuery2 = {
  query: `
    query {
      block(id: "workspace1") {
        id
        title
        content {
          id
          title
        }
      }
    }
  `,
};

describe('reading blocks', () => {
  test('should return workspaces of authenticated user and its content', async () => {
    const result = await testServer.executeOperation({ query: workspaceQuery.query });
    expect(result).toBeDefined();
    result.data.blocks.forEach((block: BlockClass) => {
      expect(block.content).toBeDefined();
    });
    expect(result.data.blocks).toBeInstanceOf(Array);
    return result.data.blocks.forEach((block: BlockClass) => {
      expect(block.createdById).toBe('bbe42984-051b-4a01-b45d-b8d29c32200c');
    });
  });

  test('should return a block and its content by id', async () => {
    const result = await testServer.executeOperation({ query: blockByIdQuery.query });
    expect(result.data.block.title).toBe('yofysiikka');
    return expect(result.data.block.content).toBeDefined();
  });
});

const createWorkspaceMutation = {
  mutation: `
    mutation {
      createBlock(block: {
        title: "Juhon testiworkspace",
        type: "workspace"
      })
    }
  `,
};

const createCollectionMutation = {
  mutation: `
    mutation {
      createBlock(block: {
        parentId: "workspace1",
        title: "testicollection",
        type: "collection"
      })
    }
  `,
};

const createOpenMutation = {
  mutation: `
    mutation {
      createBlock(block: {
        parentId: "workspace1",
        title: "opentesti",
        type: "open"
      })
    }
  `,
};

const createOpenMutation2 = {
  mutation: `
    mutation {
      createBlock(block: {
        parentId: "index1",
        title: "opentesti2",
        type: "open"
      })
    }
  `,
};

const createMultiMutation = {
  mutation: `
    mutation {
      createBlock(block: {
        parentId: "workspace1",
        title: "multitesti",
        type: "multi"
      })
    }
  `,
};

const createCollectionMutation2 = {
  mutation: `
    mutation {
      createBlock(block: {
        title: "testicollection",
        type: "collection"
      })
    }
  `,
};

const invalidCreateMutation = {
  mutation: `
    mutation {
      createBlock(block: {
        parentId: "index1",
        title: "",
        type: "collection"
      })
    }
  `,
};

describe('creating blocks', () => {
  test('should create a new workspace for authenticated user', async () => {
    const initial = await testServer.executeOperation({ query: workspaceQuery.query });
    await testServer.executeOperation({ query: createWorkspaceMutation.mutation });
    const result = await testServer.executeOperation({ query: workspaceQuery.query });
    return expect(result.data.blocks.length).toBe(initial.data.blocks.length + 1);
  });

  test('should create a new block of type collection named "testicollection1234" inside workspace1', async () => {
    const initial = await testServer.executeOperation({ query: blockByIdQuery2.query });
    await testServer.executeOperation({ query: createCollectionMutation.mutation });
    const result = await testServer.executeOperation({ query: blockByIdQuery2.query });
    expect(result.data.block.content.filter((child: BlockClass) => child.title === "testicollection")).toHaveLength(1);
    return expect(result.data.block.content.length).toBe(initial.data.block.content.length + 1);
  });

  test("should not create a new block of type collection if parent block is not defined", async () => {
    const result = await testServer.executeOperation({ query: createCollectionMutation2.mutation });
    return expect(result.errors[0].message).toBe("Parent block is required.");
  });

  test('should create a new block of type open named "opentesti" inside workspace1', async () => {
    const initial = await testServer.executeOperation({ query: blockByIdQuery2.query });
    await testServer.executeOperation({ query: createOpenMutation.mutation });
    const result = await testServer.executeOperation({ query: blockByIdQuery2.query });
    expect(result.data.block.content.filter((child: BlockClass) => child.title === "opentesti")).toHaveLength(1);
    return expect(result.data.block.content.length).toBe(initial.data.block.content.length + 1);
  });

  test('should create a new block of type multi named "multitesti" answer workspace1', async () => {
    const initial = await testServer.executeOperation({ query: blockByIdQuery2.query });
    await testServer.executeOperation({ query: createMultiMutation.mutation });
    const result = await testServer.executeOperation({ query: blockByIdQuery2.query });
    expect(result.data.block.content.filter((child: BlockClass) => child.title === "multitesti")).toHaveLength(1);
    return expect(result.data.block.content.length).toBe(initial.data.block.content.length + 1);
  });

  test('should create a new block of type open named "opentesti2" inside collection block', async () => {
    const initial = await testServer.executeOperation({ query: blockByIdQuery.query });
    await testServer.executeOperation({ query: createOpenMutation2.mutation });
    const result = await testServer.executeOperation({ query: blockByIdQuery.query });
    expect(result.data.block.content.filter((child: BlockClass) => child.title === "opentesti2")).toHaveLength(1);
    return expect(result.data.block.content.length).toBe(initial.data.block.content.length + 1);
  });

  test("shouldn't create a new block with defective input data", async () => {
    const result = await testServer.executeOperation({ query: invalidCreateMutation.mutation });
    return expect(result.errors[0].message).toBe('title is a required field');
  });
});

const updateTitleMutation = {
  mutation: `
    mutation {
      updateBlock(
        id: "index1",
        data: {
          title: "testintekema"
        }
      )
    }
  `,
};

const updateTitleMutation2 = {
  mutation: `
    mutation {
      updateBlock(
        id: "index8",
        data: {
          title: "testintekema"
        }
      )
    }
  `,
};

const moveBlockMutation = {
  mutation: `
    mutation {
      moveBlock(
        data: {
          id: "index3",
          oldParent: "index1",
          newParent: "workspace1"
        }
      )
    }
  `,
};

const moveBlockMutation2 = {
  mutation: `
    mutation {
      moveBlock(
        data: {
          id: "index8",
          oldParent: "workspace2",
          newParent: "workspace1"
        }
      )
    }
  `,
};

describe('updating blocks', () => {
  test('should update a title of block', async () => {
    await testServer.executeOperation({ query: updateTitleMutation.mutation });
    const result = await testServer.executeOperation({ query: blockByIdQuery.query });
    return expect(result.data.block.title).toBe("testintekema")
  });

  test("shouldn't update the title of the block if its not created by authenticated user", async () => {
    const result = await testServer.executeOperation({ query: updateTitleMutation2.mutation });
    return expect(result.errors[0].message).toBe("You must be the creator of the block in order to update it.")
  });

  test('should move a block under new parent', async () => {
    const initial1 = await testServer.executeOperation({ query: blockByIdQuery2.query });
    const initial2 = await testServer.executeOperation({ query: blockByIdQuery.query });
    await testServer.executeOperation({ query: moveBlockMutation.mutation });
    const final1 = await testServer.executeOperation({ query: blockByIdQuery2.query });
    const final2 = await testServer.executeOperation({ query: blockByIdQuery.query });
    expect(final1.data.block.content.length).toBe(initial1.data.block.content.length + 1);
    return expect(final2.data.block.content.length).toBe(initial2.data.block.content.length - 1);
  });

  test("shouldn't be able to move block made by someone else", async () => {
    const initial1 = await testServer.executeOperation({ query: blockByIdQuery2.query });
    const result = await testServer.executeOperation({ query: moveBlockMutation2.mutation });
    const final1 = await testServer.executeOperation({ query: blockByIdQuery2.query });
    expect(final1.data.block.content.length).toBe(initial1.data.block.content.length);
    return expect(result.errors[0].message).toBe("You must be the creator of the block in order to move it.");
  });
});
