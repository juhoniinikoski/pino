import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import UserClass, { User } from '../../models/User';
import { EmailTakenError, InvalidIdError, UsernameTakenError } from '../errors';
import { v4 as uuid } from 'uuid';
import { object, string } from 'yup';

const createPasswordHash = (password: string) => bcrypt.hash(password, 10);

export const getUser = async (id: string | number): Promise<UserClass> => {
  let data = await User.query().findById(id);

  if (!data) {
    data = await User.query().findOne({ username: id });
  }

  if (!data) {
    throw new InvalidIdError('User');
  }

  return data;
};

export const getUsers = async (): Promise<UserClass[]> => await User.query();

const userSchema = object({
  username: string().required(),
  email: string().required(),
  password: string().required(),
});

export const createUser = async (user: Partial<UserClass>): Promise<string> => {
  const data = await userSchema.validate(user);

  const existingUsername = await User.query().where('username', data.username);

  if (existingUsername.length !== 0) {
    throw new UsernameTakenError('createUser');
  }

  const existingEmail = await User.query().where('email', data.email);

  if (existingEmail.length !== 0) {
    throw new EmailTakenError('createUser');
  }

  const passwordHash = await createPasswordHash(data.password);
  const id = uuid();

  await User.query().insertAndFetch({
    ...data,
    password: passwordHash,
    id: id,
  });

  return id;
};

const updateSchema = object({
  username: string(),
  email: string(),
});

export const updateUser = async (
  id: string | number,
  user: Partial<UserClass>,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const data = await updateSchema.validate(user);

  if (authorizedUser.id !== id) {
    throw new AuthenticationError('You can only update your data as an authenticated user.');
  }

  const { username, email } = data;

  if (username) {
    const existingUsername = await User.query().where('username', data.username);

    if (existingUsername.length !== 0) {
      throw new UsernameTakenError('updateUser');
    }
  }

  if (email) {
    const existingEmail = await User.query().where('email', data.email);

    if (existingEmail.length !== 0) {
      throw new EmailTakenError('updateUser');
    }
  }

  await User.query().patchAndFetchById(id, data);

  return id;
};

export const deleteUser = async (id: string | number, authorizedUser: UserClass): Promise<boolean> => {

  if (authorizedUser.id === id) {
    const res = await User.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteUser');
    }
    return true;
  }

  throw new AuthenticationError('You can only delete your user when authenticated.');

};
