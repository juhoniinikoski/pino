import BaseModel from './BaseModel';
import knex from '../utils/knex';

class ChannelClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'channels';

  id: string | number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ChannelClass;

export const Channel = ChannelClass.bindKnex(knex);
