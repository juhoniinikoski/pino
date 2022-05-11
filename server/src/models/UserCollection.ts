import BaseModel from './BaseModel';
import knex from '../utils/knex';

class UserCollectionClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'user_collection';

  id: string | number;
  userId: string | number;
  collectionId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default UserCollectionClass;

export const UserCollection = UserCollectionClass.bindKnex(knex);
