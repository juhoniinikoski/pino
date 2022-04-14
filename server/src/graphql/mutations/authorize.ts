import { gql, UserInputError } from 'apollo-server';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { Context } from '../../utils/entities';
import { getUser } from '../../services/user/userService';

export const typeDefs = gql`
  input AuthorizeInput {
    email: String!
    password: String!
  }
  type AuthorizationPayload {
    user: User!
    accessToken: String!
    expiresAt: DateTime!
  }
  extend type Mutation {
    """
    Generates a new access token, if provided credentials (email and password) match any registered user.
    """
    authorize(credentials: AuthorizeInput): AuthorizationPayload
  }
`;

const argsSchema = yup.object().shape({
  credentials: yup.object().shape({
    email: yup.string().required().lowercase().trim(),
    password: yup.string().required().trim(),
  }),
});

interface Args {
  credentials: {
    email: string;
    password: string;
  };
}

export const resolvers = {
  Mutation: {
    authorize: async (_obj: null, args: Args, { authService }: Context) => {
      const {
        credentials: { email, password },
      } = await argsSchema.validate(args, {
        stripUnknown: true,
      });

      const user = await getUser(email);

      if (!user) {
        throw new UserInputError('Invalid email or password');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('Invalid email or password');
      }

      return {
        user,
        ...authService.createAccessToken(user.id),
      };
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
