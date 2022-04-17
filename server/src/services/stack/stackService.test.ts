import StackClass from "../../models/Stack";
import testServer from "../../utils/testServer"

interface EdgeType {
  cursor: string
  node: StackClass
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
            public
            createdById
          }
        }
      }
    }
  `,
};

describe('testing stack read', () => {
  test("should return list of stacks created by specific user with number of questions included", async () => {
    const result = await testServer.executeOperation({query: userStackQuery.query})
    return result.data.stacks.edges.forEach((edge: EdgeType) => 
      expect(edge.node.createdById).toBe("bbe42984-051b-4a01-b45d-b8d29c32200c"))
  })
  test("should return one stack", async () => {
    const result = await testServer.executeOperation({query: stackQuery.query});
    expect(result.data.stack.id).toBe("kauppis-yh1234")
    expect(result.data.stack.questions).toBe(3)
    return expect(result.data.stack.name).toBe("kauppis-yh")
  });

  test("should return list of public stacks", async () => {
    const result = await testServer.executeOperation({query: publicQuery.query});
    console.log(result)
    expect(result.data.stacks.totalCount).toBe(2)
    return result.data.stacks.edges.forEach((edge: EdgeType) => 
      expect(edge.node.public).toBe(true))
  })
  test.todo("should return list of public stacks filtered with search keyword")
})