import BaseModel from './BaseModel';
import knex from '../utils/knex';

class UserClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'users';

  id: string | number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default UserClass;

export const User = UserClass.bindKnex(knex);
