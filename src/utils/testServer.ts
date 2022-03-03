
import { ApolloServer } from 'apollo-server';
import schema from '../graphql/schema';
// import AuthService from '../../services/authentication/authService';

const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmU0Mjk4NC0wNTFiLTRhMDEtYjQ1ZC1iOGQyOWMzMjIwMGMiLCJpYXQiOjE2NDUwMTI3MDUsImV4cCI6MjI0OTgxMjcwNSwic3ViIjoiYWNjZXNzVG9rZW4ifQ.3Is18PfizzuGepl6CRRhOLiW3IyOvQydP7NuDlk8ttY";

const testServer = new ApolloServer({ 
  schema,
  // context: () => {
  //   return {
  //     authService: new AuthService({ accessToken: TEST_TOKEN }),
  //   };
  // },
});

export default testServer;