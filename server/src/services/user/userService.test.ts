import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const usersQuery = {
  query: `
    query {
      users {
        id
        email
      }
    }
  `,
};

const authorizedUserQuery = {
  query: `
    query {
      authorizedUser {
        id
        email
        followedCollections {
          ... on Channel {
            id
            name
          }
          ... on Stack {
            id name
          }
        }
      }
    }
  `,
};

const userQueryID = {
  query: `
    query {
      user(id: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        id
        email
        followedCollections {
          ... on Channel {
            id
            name
          }
          ... on Stack {
            id name
          }
        }
      }
    }
  `,
};

const userQueryEmail = {
  query: `
    query {
      user(id: "testi2@gmail.com") {
        id
        email
        followedCollections {
          ... on Channel {
            id
            name
          }
          ... on Stack {
            id name
          }
        }
      }
    }
  `,
};

const userQueryInvalidID = {
  query: `
    query {
      user(id: "bbe42984-051b-4a01-b45d-b8d29c322") {
        id
        email
        followedCollections {
          ... on Channel {
            id
            name
          }
          ... on Stack {
            id name
          }
        }
      }
    }
  `,
};

const userQueryInvalidEmail = {
  query: `
    query {
      user(id: "joku jota ei ole olemassa@gmail.com") {
        id
        email
        followedCollections {
          ... on Channel {
            id
            name
          }
          ... on Stack {
            id name
          }
        }
      }
    }
  `,
};

describe('testing user read', () => {
  it('should get list of users', async () => {
    const result = await testServer.executeOperation({ query: usersQuery.query });
    expect(result).toBeDefined();
    return expect(result.data.users).toBeInstanceOf(Array);
  });

  it('should return one user with correct id', async () => {
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.email).toBe('testi1@gmail.com');
  });

  it('should return authorized user', async () => {
    const result = await testServer.executeOperation({ query: authorizedUserQuery.query });
    return expect(result.data.authorizedUser.id).toBe('bbe42984-051b-4a01-b45d-b8d29c32200c');
  });

  it('should throw an error if use with given id is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidID.query });
    return expect(result.errors[0].message).toBeDefined();
  });

  it('should return one user with correct email', async () => {
    const result = await testServer.executeOperation({ query: userQueryEmail.query });
    return expect(result.data.user.email).toBe('testi2@gmail.com');
  });

  it('should throw an error if user with given email is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidEmail.query });
    return expect(result.errors[0].message).toBeDefined();
  });
});

const createUserMutation = {
  mutation: `
    mutation {
      createUser(user: {
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
        email: "",
        password: "supersekret"
      })
    }
  `,
};

const takenEmailMutation = {
  mutation: `
    mutation {
      createUser(user: {
        email: "testi1@gmail.com",
        password: "supersekret"
      })
    }
  `,
};

describe('testing user creation', () => {
  it('should create a user succesfully', async () => {
    const initial = await testServer.executeOperation({ query: usersQuery.query });
    await testServer.executeOperation({ query: createUserMutation.mutation });
    const result = await testServer.executeOperation({ query: usersQuery.query });
    return expect(result.data.users.length).toBe(initial.data.users.length + 1);
  });

  it('should throw an error if email is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenEmailMutation.mutation });
    return expect(result.errors[0].message).toBe('Given email is already taken.');
  });

  it("shouldn't create a user if data is defective", async () => {
    const result = await testServer.executeOperation({ query: defectiveCreationMutation.mutation });
    return expect(result.errors[0].message).toBe('email is a required field');
  });
});

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

const updateEmailMutation2 = {
  mutation: `
    mutation {
      updateUser(
        id: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2",
        data: {
          email: "testi123456@gmail.com"
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
  it('should update a user succesfully if email is changed', async () => {
    await testServer.executeOperation({ query: updateEmailMutation.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.email).toBe('testi123456@gmail.com');
  });

  it('should throw an error if wanted email is already taken', async () => {
    const result = await testServer.executeOperation({ query: takenEmailUpdateMutation.mutation });
    return expect(result.errors[0].message).toBe('Given email is already taken.');
  });

  it('should throw an error if user is not authorized to update a user', async () => {
    const result = await testServer.executeOperation({ query: updateEmailMutation2.mutation });
    return expect(result.errors[0].message).toBe('You can only update your data as an authenticated user.');
  });
});

const followCollection = {
  mutation: `
    mutation {
      followCollection (
        collectionId: "kauppikseen1234channel"
      )
    }
  `,
};

const followCollection2 = {
  mutation: `
    mutation {
      followCollection (
        collectionId: "kauppis-yh1234stack"
      )
    }
  `,
};

describe('follow tests', () => {
  it('should be able to unfollow a channel', async () => {
    await testServer.executeOperation({ query: followCollection.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.followedCollections.length).toBe(2);
  });

  it('should be able to follow a collection', async () => {
    await testServer.executeOperation({ query: followCollection.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.followedCollections.length).toBe(3);
  });

  it('should be able to follow a stack', async () => {
    await testServer.executeOperation({ query: followCollection2.mutation });
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.followedCollections.length).toBe(4);
  });
});

// const deleteUserMutation = {
//   mutation: `
//     mutation {
//       deleteUser(
//         id: "bbe42984-051b-4a01-b45d-b8d29c32200c"
//       )
//     }
//   `,
// };

// const unableDeleteMutation = {
//   mutation: `
//     mutation {
//       deleteUser(
//         id: "1b10e4d8-57ee-4d00-8886-e4a049d7ff8f"
//       )
//     }
//   `,
// };

// describe('testing user deletion', () => {
//   it('should throw an error if the user wanted to delete is not the authorized user', async () => {
//     const initial = await testServer.executeOperation({ query: usersQuery.query });
//     const mutation = await testServer.executeOperation({ query: unableDeleteMutation.mutation });
//     const result = await testServer.executeOperation({ query: usersQuery.query });
//     expect(mutation.errors[0].message).toBe('You can only delete your user when authenticated.');
//     return expect(result.data.users.length).toBe(initial.data.users.length);
//   });

//   it('should delete a user succesfully', async () => {
//     const initial = await testServer.executeOperation({ query: usersQuery.query });
//     await testServer.executeOperation({ query: deleteUserMutation.mutation });
//     const result = await testServer.executeOperation({ query: usersQuery.query });
//     return expect(result.data.users.length).toBe(initial.data.users.length - 1);
//   });
// });
