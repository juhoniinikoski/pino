import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const usersQuery = {
  query: `
    query {
      users {
        id
        username
        email
      }
    }
  `,
};

const userQueryID = {
  query: `
    query {
      user(id: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        id
        username
        email
      }
    }
  `,
};

const userQueryUsername = {
  query: `
    query {
      user(id: "johndoe") {
        id
        username
        email
      }
    }
  `,
};

const userQueryInvalidID = {
  query: `
    query {
      user(id: "bbe42984-051b-4a01-b45d-b8d29c322") {
        id
        username
        email
      }
    }
  `,
};

const userQueryInvalidUsername = {
  query: `
    query {
      user(id: "joku jota ei ole olemassa") {
        id
        username
        email
      }
    }
  `,
};

describe('testing user read', () => {
  test('should get list of users', async () => {
    const result = await testServer.executeOperation({ query: usersQuery.query });
    expect(result).toBeDefined();
    return expect(result.data.users).toBeInstanceOf(Array);
  });

  test('should return one user with correct id', async () => {
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.username).toBe('juhoniinikoski');
  });

  test('should throw an error if use with given id is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidID.query });
    return expect(result.errors[0].message).toBeDefined();
  });

  test('should return one user with correct username', async () => {
    const result = await testServer.executeOperation({ query: userQueryUsername.query });
    return expect(result.data.user.username).toBe('johndoe');
  });

  test('should throw an error if user with given username is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidUsername.query });
    return expect(result.errors[0].message).toBeDefined();
  });
});

const createUserMutation = {
  mutation: `
    mutation {
      createUser(user: {
        username: "juhoN",
        email: "juho@gmail.com",
        password: "supersekret"
      })
    }
  `,
};

const defectiveCreationMutation = {
  mutation: `
    mutation {
      createUser(user: {
        username: "",
        email: "juho123@gmail.com",
        password: "supersekret"
      })
    }
  `,
};

const takenUsernameMutation = {
  mutation: `
    mutation {
      createUser(user: {
        username: "juhoniinikoski",
        email: "juho@gmail.com",
        password: "supersekret"
      })
    }
  `,
};

const takenEmailMutation = {
  mutation: `
    mutation {
      createUser(user: {
        username: "juhoniinikoski1234",
        email: "testi1@gmail.com",
        password: "supersekret"
      })
    }
  `,
};

describe('testing user creation', () => {
  test('should create a user succesfully', async () => {
    const initial = await testServer.executeOperation({ query: usersQuery.query });
    await testServer.executeOperation({ query: createUserMutation.mutation });
    const result = await testServer.executeOperation({ query: usersQuery.query });
    return expect(result.data.users.length).toBe(initial.data.users.length + 1);
  });

  test('should throw an error if username is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenUsernameMutation.mutation });
    return expect(result.errors[0].message).toBe('Given username is already taken.');
  });

  test('should throw an error if email is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenEmailMutation.mutation });
    return expect(result.errors[0].message).toBe('Given email is already taken.');
  });

  test("shouldn't create a user if data is defective", async () => {
    const result = await testServer.executeOperation({ query: defectiveCreationMutation.mutation });
    return expect(result.errors[0].message).toBe('username is a required field');
  });
});

const updateUsernameMutation = {
  mutation: `
    mutation {
      updateUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        data: {
          username: "juhoniinikoski1234"
        }
      )
    }
  `,
};

const updateEmailMutation = {
  mutation: `
    mutation {
      updateUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        data: {
          email: "testi123456@gmail.com"
        }
      )
    }
  `,
};

const updateMutation = {
  mutation: `
    mutation {
      updateUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        data: {
          username: "juhoniinikoski",
          email: "testi1@gmail.com"
        }
      )
    }
  `,
};

const updateMutation2 = {
  mutation: `
    mutation {
      updateUser(
        id: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2",
        data: {
          username: "meijänmasa"
        }
      )
    }
  `,
};

const takenUsernameUpdateMutation = {
  mutation: `
    mutation {
      updateUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        data: {
          username: "johndoe"
        }
      )
    }
  `,
};

const takenEmailUpdateMutation = {
  mutation: `
    mutation {
      updateUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        data: {
          email: "testi2@gmail.com"
        }
      )
    }
  `,
};

describe('testing user updates', () => {
  test('should update a user succesfully if username is changed', async () => {
    await testServer.executeOperation({ query: updateUsernameMutation.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.username).toBe('juhoniinikoski1234');
  });

  test('should update a user succesfully if email is changed', async () => {
    await testServer.executeOperation({ query: updateEmailMutation.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.email).toBe('testi123456@gmail.com');
  });

  test('should update a user succesfully if username and email is changed', async () => {
    await testServer.executeOperation({ query: updateMutation.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    expect(result.data.user.username).toBe('juhoniinikoski');
    return expect(result.data.user.email).toBe('testi1@gmail.com');
  });

  test('should throw an error if wanted username is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenUsernameUpdateMutation.mutation });
    return expect(result.errors[0].message).toBe('Given username is already taken.');
  });

  test('should throw an error if wanted email is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenEmailUpdateMutation.mutation });
    return expect(result.errors[0].message).toBe('Given email is already taken.');
  });

  test('should throw an error if user is not authorized to update a user', async () => {
    const result = await testServer.executeOperation({ query: updateMutation2.mutation });
    return expect(result.errors[0].message).toBe('You can only update your data as an authenticated user.');
  });
});

const deleteUserMutation = {
  mutation: `
    mutation {
      deleteUser(
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c"
      )
    }
  `,
};

const unableDeleteMutation = {
  mutation: `
    mutation {
      deleteUser(
        id: "1b10e4d8-57ee-4d00-8886-e4a049d7ff8f"
      )
    }
  `,
};

describe('testing user deletion', () => {
  test('should throw an error if the user wanted to delete is not the authorized user', async () => {
    const initial = await testServer.executeOperation({ query: usersQuery.query });
    const mutation = await testServer.executeOperation({ query: unableDeleteMutation.mutation });
    const result = await testServer.executeOperation({ query: usersQuery.query });
    expect(mutation.errors[0].message).toBe('You can only delete your user when authenticated.');
    return expect(result.data.users.length).toBe(initial.data.users.length);
  });

  test('should delete a user succesfully', async () => {
    const initial = await testServer.executeOperation({ query: usersQuery.query });
    await testServer.executeOperation({ query: deleteUserMutation.mutation });
    const result = await testServer.executeOperation({ query: usersQuery.query });
    return expect(result.data.users.length).toBe(initial.data.users.length - 1);
  });
});
