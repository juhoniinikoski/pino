import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';
import CollectionClass from './Collection';

class UserClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'users';

  id: string | number;
  email: string;
  password: string;
  followedCollections: CollectionClass[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings = {
    followedCollections: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Collection',
      join: {
        from: 'users.id',
        through: {
          // user_collection is the join table.
          from: 'user_collection.userId',
          to: 'user_collection.collectionId',
        },
        to: 'collections.id',
      },
    }
  };
}

export default UserClass;

export const User = UserClass.bindKnex(knex);
