import BaseModel from './BaseModel';
import knex from '../utils/knex';

class StackChannelClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'stack_channel';

  id: string | number;
  stackId: string | number;
  channelId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default StackChannelClass;

export const StackChannel = StackChannelClass.bindKnex(knex);
