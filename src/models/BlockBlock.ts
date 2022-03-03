import knex from '../utils/knex';
import { Model } from 'objection';

export default class BlockBlockClass extends Model {
  
  static idColumn = 'id';

  static tableName = 'block_block';

}

export const BlockBlock = BlockBlockClass.bindKnex(knex);