import { ApolloServer } from 'apollo-server';
import schema from './graphql/schema';
// import AuthService from './services/authentication/authService';

const server = new ApolloServer({ 
  schema,
  // context: ({ req }) => {

  //   const authorization = req.get('authorization');
  //   const accessToken = authorization ? authorization.split(' ')[1] : undefined;

  //   return {
  //     authService: new AuthService({ accessToken }),
  //   };
  // },
});

/* eslint-disable  @typescript-eslint/no-floating-promises */
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`);
});