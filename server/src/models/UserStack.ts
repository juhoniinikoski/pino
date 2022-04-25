import BaseModel from './BaseModel';
import knex from '../utils/knex';

class UserStackClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'user_stack';

  id: string | number;
  stackId: string | number;
  userId: string | number;
  createdAt: Date
  updatedAt: Date
}

export default UserStackClass;

export const UserStack = UserStackClass.bindKnex(knex);
