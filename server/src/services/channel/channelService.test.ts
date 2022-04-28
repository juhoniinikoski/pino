import testServer from '../../utils/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
/* eslint-disable @typescript-eslint/no-unsafe-return*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

const channelQuery = {
  query: `
    query {
      channel (id: "kauppikseen1234") {
        id
        name
        questions
        followedBy
      }
    }
  `,
};

const channelsQuery = {
  query: `
    query {
      channels {
        totalCount
        edges {
          node {
            id
            name
            questions
            followedBy
          }
        }
      }
    }
  `,
};

const channelsQueryKeyword = {
  query: `
    query {
      channels (searchKeyword: "DI") {
        totalCount
        edges {
          node {
            id
            name
            questions
            followedBy
          }
        }
      }
    }
  `,
};

describe('testing channel read', () => {
  test('should return one channel with no of questions included', async () => {
    const result = await testServer.executeOperation({ query: channelQuery.query });
    return expect(result.data.channel.name).toBe('kauppikseen');
  });

  test('should return paginated list of channels', async () => {
    const result = await testServer.executeOperation({ query: channelsQuery.query });
    expect(result.data.channels.edges.length).toBeGreaterThan(0);
    return expect(result.data.channels.totalCount).toBeGreaterThan(0);
  });

  test('should return paginated list of channels filtered with search keyword', async () => {
    const result = await testServer.executeOperation({ query: channelsQueryKeyword.query });
    expect(result.data.channels.edges.length).toBe(1);
    return expect(result.data.channels.edges[0].node.name).toEqual('DIA2022');
  });
});

const createChannelMutation = {
  mutation: `
    mutation {
      createChannel(channel: {
        name: "testichannel"
      })
    }
  `,
};

const createChannelMutation2 = {
  mutation: `
    mutation {
      createChannel(channel: {
        name: ""
      })
    }
  `,
};

describe('testing channel creation', () => {
  test('should create a new channel', async () => {
    const initial = await testServer.executeOperation({ query: channelsQuery.query });
    await testServer.executeOperation({ query: createChannelMutation.mutation });
    const result = await testServer.executeOperation({ query: channelsQuery.query });
    return expect(result.data.channels.totalCount).toBe(initial.data.channels.totalCount + 1);
  });

  test('shouldnt create a new channel if there already exists channel with the same name', async () => {
    const mutation = await testServer.executeOperation({ query: createChannelMutation.mutation });
    return expect(mutation.errors[0].message).toBe('channel with given name already exists');
  });

  test('shouldnt create a new channel as no name is given', async () => {
    const mutation = await testServer.executeOperation({ query: createChannelMutation2.mutation });
    return expect(mutation.errors[0].message).toBe('name is a required field');
  });
});

const deleteChannelMutation = {
  mutation: `
    mutation {
      deleteChannel(id: "yomatematiikka1234")
    }
  `,
};

const deleteChannelMutation2 = {
  mutation: `
    mutation {
      deleteChannel(id: "kauppikseen1234")
    }
  `,
};

describe('testing channel deletion', () => {
  test('should delete a channel succesfully', async () => {
    const initial = await testServer.executeOperation({ query: channelsQuery.query });
    await testServer.executeOperation({ query: deleteChannelMutation.mutation });
    const result = await testServer.executeOperation({ query: channelsQuery.query });
    return expect(result.data.channels.totalCount).toBe(initial.data.channels.totalCount - 1);
  });

  test('shouldnt delete channel if there are still questions related to it', async () => {
    const mutation = await testServer.executeOperation({ query: deleteChannelMutation2.mutation });
    return expect(mutation.errors[0].message).toBe('You can only delete the channel if it has no questions.');
  });
});
