import AuthService from '../services/authentication/authService';

export interface Context {
  authService: AuthService;
}

export interface PageInfoType {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}
