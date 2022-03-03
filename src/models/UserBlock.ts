import knex from '../utils/knex';
import { Model } from 'objection';

export default class UserBlockClass extends Model {
  static idColumn = 'id';

  static tableName = 'user_block';
}

export const UserBlock = UserBlockClass.bindKnex(knex);
