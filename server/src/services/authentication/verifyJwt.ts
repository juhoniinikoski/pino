import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/config';

/* eslint-disable @typescript-eslint/no-explicit-any */

const verifyJwt = (token: string, options: jwt.VerifyOptions): any => {
  return jwt.verify(token, JWT_SECRET, options);
};

export default verifyJwt;
