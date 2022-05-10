import { ApolloServer } from 'apollo-server';
import schema from './graphql/schema';
import * as dotenv from 'dotenv';
import AuthService from './services/authentication/authService';

dotenv.config();

const server = new ApolloServer({
  schema,
  cors: {
    origin: ['http://192.168.100.23:19000', 'https://studio.apollographql.com'],
    credentials: true,
  },
  context: ({ req }) => {
    const authorization = req.get('authorization');
    const accessToken = authorization ? authorization.split(' ')[1] : undefined;

    return {
      authService: new AuthService({ accessToken }),
    };
  },
});

/* eslint-disable  @typescript-eslint/no-floating-promises */
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}graphql`);
});
