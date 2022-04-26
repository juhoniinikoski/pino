import BaseModel from './BaseModel';
import knex from '../utils/knex';

class UserChannelClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'user_channel';

  id: string | number;
  userId: string | number;
  channelId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default UserChannelClass;

export const UserChannel = UserChannelClass.bindKnex(knex);
