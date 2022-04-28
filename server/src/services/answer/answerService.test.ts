import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const answerQuery = {
  query: `
    query {
      answer (id: "1") {
        id
        answer
        correct
        questionId
      }
    }
  `,
};

const answersQuery = {
  query: `
    query {
      answers {
        id
        answer
        correct
        questionId
      }
    }
  `,
};

const updateMutation = {
  mutation: `
    mutation {
      updateAnswer(
        id: "1",
        data: {
          answer: "testianswer",
          correct: true
        }
      )
    }
  `,
};

const createMutation = {
  mutation: `
    mutation {
      createAnswer (
        answer: {
          answer: "testianswer2",
          correct: true,
          questionId: "2"
        }
      )
    }
  `,
};

const createMutation2 = {
  mutation: `
    mutation {
      createAnswer (
        answer: {
          answer: "testianswer2",
          correct: true,
          questionId: "4"
        }
      )
    }
  `,
};

const updateMutation2 = {
  mutation: `
    mutation {
      updateAnswer(
        id: "10",
        data: {
          answer: "testianswer",
          correct: true
        }
      )
    }
  `,
};

const deleteMutation = {
  mutation: `
    mutation {
      deleteAnswer(
        id: "4"
      )
    }
  `,
};

const deleteMutation2 = {
  mutation: `
    mutation {
      deleteAnswer(
        id: "10"
      )
    }
  `,
};

describe('answer mutations', () => {
  test('should be able to create a new answer', async () => {
    const initial = await testServer.executeOperation({ query: answersQuery.query });
    await testServer.executeOperation({ query: createMutation.mutation });
    const result = await testServer.executeOperation({ query: answersQuery.query });
    return expect(result.data.answers.length).toBe(initial.data.answers.length + 1);
  });

  test('should be able to edit the answer', async () => {
    await testServer.executeOperation({ query: updateMutation.mutation });
    const result = await testServer.executeOperation({ query: answerQuery.query });
    expect(result.data.answer.correct).toBe(true);
    expect(result.data.answer.questionId).toBe('1');
    return expect(result.data.answer.answer).toBe('testianswer');
  });

  test('should throw an error if question related to new answer is not made by authorized user', async () => {
    const mutation = await testServer.executeOperation({ query: createMutation2.mutation });
    return expect(mutation.errors[0].message).toBe('You can only create answers to questions you have made.');
  });

  test('should throw an error if answer that is wanted to update is not made by authorized user', async () => {
    const mutation = await testServer.executeOperation({ query: updateMutation2.mutation });
    return expect(mutation.errors[0].message).toBe(
      'You can only update the answer if you are the creator of related question.',
    );
  });

  test('should be able to delete the answer if there are more than one answer related to that question', async () => {
    const initial = await testServer.executeOperation({ query: answersQuery.query });
    await testServer.executeOperation({ query: deleteMutation.mutation });
    const result = await testServer.executeOperation({ query: answersQuery.query });
    return expect(result.data.answers.length).toBe(initial.data.answers.length - 1);
  });

  test('should throw an error if answer that is wanted to delete is not made by authorized user', async () => {
    const result = await testServer.executeOperation({ query: deleteMutation2.mutation });
    return expect(result.errors[0].message).toBe('You can only delete the answer if you have made it.');
  });
});
