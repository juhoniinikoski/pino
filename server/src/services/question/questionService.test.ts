import { Answer } from '../../models/Answer';
import ChannelClass from '../../models/Channel';
import QuestionClass from '../../models/Question';
import StackClass from '../../models/Stack';
import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-return*/

const channelQuery = {
  query: `
    query {
      questions (channelId: "kauppikseen1234") {
        id
        type
        createdById
        answers {
          answer
          correct
        }
        createdAt
        updatedAt
        channels {
          id
        }
      }
    }
  `,
};

const stackQuery = {
  query: `
    query {
      questions (stackId: "kauppis-yh1234") {
        id
        type
        createdById
        answers {
          answer
          correct
        }
        createdAt
        updatedAt
        stacks {
          id
        }
      }
    }
  `,
};

const userQuery = {
  query: `
    query {
      questions (createdBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        id
        type
        question
        createdById
        answers {
          answer
          correct
        }
        createdAt
        updatedAt
      }
    }
  `,
};

describe('testing question queries', () => {
  test('should return a list of questions of a certain channel', async () => {
    const result = await testServer.executeOperation({ query: channelQuery.query });
    expect(result).toBeDefined();
    return result.data.questions.forEach((question: QuestionClass) => {
      expect(question.channels.filter((q: ChannelClass) => q.id === 'kauppikseen1234').length).toBeGreaterThan(0);
    });
  });

  test('should return a list of questions of a certain stack', async () => {
    const result = await testServer.executeOperation({ query: stackQuery.query });
    expect(result).toBeDefined();
    return result.data.questions.forEach((question: QuestionClass) => {
      expect(question.stacks.filter((q: StackClass) => q.id === 'kauppis-yh1234').length).toBeGreaterThan(0);
    });
  });

  test('should get all questions made by authorized user', async () => {
    const result = await testServer.executeOperation({ query: userQuery.query });
    expect(result).toBeDefined();
    return result.data.questions.forEach((question: QuestionClass) => {
      expect(question.createdById).toBe('bbe42984-051b-4a01-b45d-b8d29c32200c');
    });
  });
});

const createQuestionMutation = {
  mutation: `
    mutation {
      createQuestion(question: {
        question: "testikysymys",
        publish: true,
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
        publish: true,
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
    return expect(result.data.questions.length).toBe(initial.data.questions.length + 1);
  });

  test('should throw an error if question is empty', async () => {
    const result = await testServer.executeOperation({ query: defectiveCreationMutation.mutation });
    return expect(result.errors[0].message).toBe('question is a required field');
  });

  test('should update the question if it is made by authorized user', async () => {
    await testServer.executeOperation({ query: updateQuestionMutation.mutation });
    const result = await testServer.executeOperation({ query: userQuery.query });
    const question: QuestionClass = result.data.questions.find((q: QuestionClass) => q.id === '1');
    expect(question.question).toBe('testiquestion');
  });

  test("shouldn't update the question due to unauthorized user", async () => {
    const result = await testServer.executeOperation({ query: updateQuestionMutation2.mutation });
    return expect(result.errors[0].message).toBe('You must be the creator of the question in order to update it.');
  });

  test('should throw an error if the question wanted to delete is not made by the authorized user', async () => {
    const initial = await testServer.executeOperation({ query: userQuery.query });
    const initialAnswersLength = (await Answer.query()).length
    const mutation = await testServer.executeOperation({ query: unableDeleteMutation.mutation });
    const result = await testServer.executeOperation({ query: userQuery.query });
    const resultAnswersLength = (await Answer.query()).length
    expect(initialAnswersLength).toEqual(resultAnswersLength)
    expect(mutation.errors[0].message).toBe("You must be the creator of the question in order to delete it.");
    return expect(result.data.questions.length).toBe(initial.data.questions.length);
  });

  test('should delete a question and its answers succesfully', async () => {
    const initial = await testServer.executeOperation({ query: userQuery.query });
    const initialAnswersLength = (await Answer.query()).length
    await testServer.executeOperation({ query: deleteQuestionMutation.mutation });
    const resultAnswersLength = (await Answer.query()).length
    const result = await testServer.executeOperation({ query: userQuery.query });
    expect(initialAnswersLength).toBeGreaterThan(resultAnswersLength)
    return expect(result.data.questions.length).toBe(initial.data.questions.length - 1);
  });
});