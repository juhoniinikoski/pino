import { Answer } from '../../models/Answer';
import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-return*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

const channelQuery = {
  query: `
    query {
      questions (collectionId: "kauppikseen1234channel") {
        edges {
          node {
            id
            type
            createdById
            answers {
              answer
              correct
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
};

const stackQuery = {
  query: `
  query {
    questions (collectionId: "kauppis-yh1234stack") {
      edges {
        node {
          id
          type
          createdById
          answers {
            answer
            correct
          }
          createdAt
          updatedAt
        }
      }
    }
  }
  `,
};

const userQuery = {
  query: `
    query {
      questions (createdBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        edges {
          node {
            id
            type
            question
            createdById
            answers {
              answer
              correct
            }
            createdAt
          }
        }
      }
    }
  `,
};

describe('testing question queries', () => {
  test('should return a list of questions of a certain channel', async () => {
    const result = await testServer.executeOperation({ query: channelQuery.query });
    expect(result).toBeDefined();
    return expect(result.data.questions.edges.length).toBe(4);
  });

  test('should return a list of questions of a certain stack', async () => {
    const result = await testServer.executeOperation({ query: stackQuery.query });
    expect(result).toBeDefined();
    return expect(result.data.questions.edges.length).toBe(3);
  });

  test('should get all questions made by authorized user', async () => {
    const result = await testServer.executeOperation({ query: userQuery.query });
    expect(result).toBeDefined();
    return result.data.questions.edges.forEach((edge: any) => {
      expect(edge.node.createdById).toBe('bbe42984-051b-4a01-b45d-b8d29c32200c');
    });
  });
});

const createQuestionMutation = {
  mutation: `
    mutation {
      createQuestion(question: {
        question: "testikysymys",
        type: "multi",
        answers: [
          {
            answer: "eka",
            correct: false
          },
          {
            answer: "toka",
            correct: true
          },
        ]
      })
    }
  `,
};

const defectiveCreationMutation = {
  mutation: `
    mutation {
      createQuestion(question: {
        question: "",
        type: "multi",
        answers: [
          {
            answer: "eka",
            correct: false
          },
          {
            answer: "toka",
            correct: true
          },
        ]
      })
    }
  `,
};

const updateQuestionMutation = {
  mutation: `
    mutation {
      updateQuestion(
        data: {
          question: "testiquestion"
          id: "1"
        }
      )
    }
  `,
};

const updateQuestionMutation2 = {
  mutation: `
    mutation {
      updateQuestion(
        data: {
          question: "testiquestion"
          id: "5"
        }
      )
    }
  `,
};

const deleteQuestionMutation = {
  mutation: `
    mutation {
      deleteQuestion(
        id: "1"
      )
    }
  `,
};

const unableDeleteMutation = {
  mutation: `
    mutation {
      deleteQuestion(
        id: "5"
      )
    }
  `,
};

describe('question mutation', () => {
  test('should create a new question', async () => {
    const initial = await testServer.executeOperation({ query: userQuery.query });
    await testServer.executeOperation({ query: createQuestionMutation.mutation });
    const result = await testServer.executeOperation({ query: userQuery.query });
    return expect(result.data.questions.edges.length).toBe(initial.data.questions.edges.length + 1);
  });

  test('should throw an error if question is empty', async () => {
    const result = await testServer.executeOperation({ query: defectiveCreationMutation.mutation });
    return expect(result.errors[0].message).toBe('question is a required field');
  });

  test('should update the question if it is made by authorized user', async () => {
    await testServer.executeOperation({ query: updateQuestionMutation.mutation });
    const result = await testServer.executeOperation({ query: userQuery.query });
    const question: any = result.data.questions.edges.find((edge: any) => edge.node.id === '1');
    expect(question.node.question).toBe('testiquestion');
  });

  test("shouldn't update the question due to unauthorized user", async () => {
    const result = await testServer.executeOperation({ query: updateQuestionMutation2.mutation });
    return expect(result.errors[0].message).toBe('You must be the creator of the question in order to update it.');
  });

  test('should throw an error if the question wanted to delete is not made by the authorized user', async () => {
    const initial = await testServer.executeOperation({ query: userQuery.query });
    const initialAnswersLength = (await Answer.query()).length;
    const mutation = await testServer.executeOperation({ query: unableDeleteMutation.mutation });
    const result = await testServer.executeOperation({ query: userQuery.query });
    const resultAnswersLength = (await Answer.query()).length;
    expect(initialAnswersLength).toEqual(resultAnswersLength);
    expect(mutation.errors[0].message).toBe('You must be the creator of the question in order to delete it.');
    return expect(result.data.questions.length).toBe(initial.data.questions.length);
  });

  test('should delete a question and its answers succesfully', async () => {
    const initial = await testServer.executeOperation({ query: userQuery.query });
    const initialAnswersLength = (await Answer.query()).length;
    await testServer.executeOperation({ query: deleteQuestionMutation.mutation });
    const resultAnswersLength = (await Answer.query()).length;
    const result = await testServer.executeOperation({ query: userQuery.query });
    expect(initialAnswersLength).toBeGreaterThan(resultAnswersLength);
    return expect(result.data.questions.edges.length).toBe(initial.data.questions.edges.length - 1);
  });
});
