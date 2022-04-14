import BaseModel from './BaseModel';
import knex from '../utils/knex';

class StackClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'stacks';

  id: string | number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default StackClass;

export const Stack = StackClass.bindKnex(knex);
