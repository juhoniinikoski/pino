import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../utils/config';

const signJwt = (payload: Record<string, unknown>, options: Record<string, unknown>): string => {
  return jwt.sign(payload, JWT_SECRET, options);
};

export default signJwt;
