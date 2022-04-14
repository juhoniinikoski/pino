import { ApolloError } from 'apollo-server';

export class InvalidIdError extends ApolloError {
  constructor(field: string) {
    super(`${field} with given id doesn't exist.`, 'INCORRECT_ID', { field: field });
  }
}

export class EmailTakenError extends ApolloError {
  constructor(field: string) {
    super('Given email is already taken.', 'EMAIL_TAKEN', { field: field });
  }
}
