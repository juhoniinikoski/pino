import { ApolloServer } from 'apollo-server';
import schema from '../graphql/schema';
import AuthService from '../services/authentication/authService';

const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmU0Mjk4NC0wNTFiLTRhMDEtYjQ1ZC1iOGQyOWMzMjIwMGMiLCJpYXQiOjE2NDYzMDk1NjgsImV4cCI6MjI1MTEwOTU2OCwic3ViIjoiYWNjZXNzVG9rZW4ifQ._AI8m8v3IxskszB_xxNlSytOketNhrjWZrRztz8_XjE';

const testServer = new ApolloServer({
  schema,
  context: () => {
    return {
      authService: new AuthService({ accessToken: TEST_TOKEN }),
    };
  },
});

export default testServer;
