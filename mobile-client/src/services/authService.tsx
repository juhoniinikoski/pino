import { AUTHORIZE } from '../graphql/mutations';
import apolloClient from '../utils/apolloClient';

export type AuthData = {
  token: string;
  email: string;
};

const signIn = async (): Promise<AuthData> => {
  // const signIn = async (username: string, password: string): Promise<AuthData> => {

  const { data } = await apolloClient.mutate({
    mutation: AUTHORIZE,
    variables: {
      email: 'testi1@gmail.com',
      password: 'password',
    },
  });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: data.authorize.accessToken,
        email: 'testi1@gmail.com',
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};
