import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* eslint-disable no-underscore-dangle */

const httpLink = createHttpLink({
  uri: `http://localhost:3001/graphql`,
  // uri: `https://pino-app-api.herokuapp.com/graphql`,
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }) =>
  AsyncStorage.getItem('@AuthData').then(data => {
    const token = data ? JSON.parse(data).token : null;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }),
);

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: o => (o._id ? `${o.__typename}:${o._id}` : undefined),
    }),
  });
};

export default createApolloClient();
