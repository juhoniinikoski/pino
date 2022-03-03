import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class UserClass extends BaseModel {
  
  static idColumn = 'id';

  static tableName = 'users';

  static relationMappings = {

    savedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserBlock',
      join: {
        from: 'users.id',
        to: 'user_block.userId'
      }
    },

  };
  
  id: string | number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default UserClass;

export const User = UserClass.bindKnex(knex);