import { AuthenticationError } from 'apollo-server';
import { ACCESS_TOKEN_EXPIRATION_TIME } from '../../utils/config';
import { getUser } from '../user/userService';
import signJwt from './signJwt';
import verifyJwt from './verifyJwt';

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const subject = 'accessToken';

class AuthService {
  accessToken: string;

  constructor({ accessToken }: { accessToken: string }) {
    this.accessToken = accessToken;
  }

  getAuthorizedUserId(): string | number {
    if (!this.accessToken) {
      return null;
    }

    let tokenPayload;

    try {
      tokenPayload = verifyJwt(this.accessToken, { subject });
    } catch (e) {
      return null;
    }

    return tokenPayload.userId;
  }

  async getAuthorizedUser() {
    const id: string | number = this.getAuthorizedUserId();

    if (!id) {
      return null;
    }

    return await getUser(id);
  }

  async getAuthorizedUserOrFail(error?: string) {
    const normalizedError = error || new AuthenticationError('Authorization is required');

    const user = await this.getAuthorizedUser();

    if (!user) {
      throw normalizedError;
    }

    return user;
  }

  createAccessToken(userId: string | number) {
    const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRATION_TIME);

    return {
      accessToken: signJwt(
        { userId },
        {
          expiresIn: expiresAt.getTime() - new Date().getTime(),
          subject,
        },
      ),
      expiresAt,
    };
  }
}

export default AuthService;
