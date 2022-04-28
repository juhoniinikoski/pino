// import { apolloClient } from '../utils/apolloClient';
// import { AUTHORIZE } from "../../utils/graphql/mutations"

export type AuthData = {
  token: string;
  name: string;
};

const signIn = async (
  username: string,
  password: string,
): Promise<AuthData> => {
  // const { data } = await apolloClient.mutate({
  //   mutation: AUTHORIZE,
  //   variables: {
  //     username,
  //     password
  //   }
  // })

  const data = {
    authorize: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmU0Mjk4NC0wNTFiLTRhMDEtYjQ1ZC1iOGQyOWMzMjIwMGMiLCJpYXQiOjE2NDUyNjkxMTQsImV4cCI6MjI1MDA2OTExNCwic3ViIjoiYWNjZXNzVG9rZW4ifQ.SDhiE64ZsiQEww9WzM1emgDxEP0vu5SxHMeDaTS9QLU',
    },
  };

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: data.authorize.accessToken,
        name: username,
      });
    }, 1000);
  });
};

export const authService = {
  signIn,
};
