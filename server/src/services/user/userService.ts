import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import UserClass, { User } from '../../models/User';
import { EmailTakenError, InvalidIdError } from '../errors';
import { v4 as uuid } from 'uuid';
import { object, string } from 'yup';
import { UserChannel } from '../../models/UserChannel';
import { UserStack } from '../../models/UserStack';

const createPasswordHash = (password: string) => bcrypt.hash(password, 10);

export const getUser = async (id: string | number): Promise<UserClass> => {
  let data = await User.query().findById(id).withGraphFetched('[followedChannels, followedStacks]');

  if (!data) {
    data = await User.query().findOne({ email: id }).withGraphFetched('[followedChannels, followedStacks]');
  }

  if (!data) {
    throw new InvalidIdError('User');
  }

  return data;
};

export const getUsers = async (): Promise<UserClass[]> => await User.query();

const userSchema = object({
  email: string().required(),
  password: string().required(),
});

export const createUser = async (user: Partial<UserClass>): Promise<string> => {
  const data = await userSchema.validate(user);

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

  const { email } = data;

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

export const followChannel = async (
  channelId: string | number,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const alreadyFollowing = await UserChannel.query().where({ userId: authorizedUser.id, channelId: channelId });

  if (alreadyFollowing.length !== 0) {
    await UserChannel.query().where({ userId: authorizedUser.id, channelId: channelId }).delete();
  } else {
    await UserChannel.query().insert({ userId: authorizedUser.id, channelId: channelId });
  }

  return channelId;
};

export const followStack = async (stackId: string | number, authorizedUser: UserClass): Promise<string | number> => {
  const alreadyFollowing = await UserStack.query().where({ userId: authorizedUser.id, stackId: stackId });

  if (alreadyFollowing.length !== 0) {
    await UserStack.query().where({ userId: authorizedUser.id, stackId: stackId }).delete();
  } else {
    await UserStack.query().insert({ userId: authorizedUser.id, stackId: stackId });
  }

  return stackId;
};
