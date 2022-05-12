import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class CollectionClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'collections';

  id: string | number;
  name: string;
  type: string;
  public: string | boolean;
  followedBy: number;
  createdById: string | number;
  createdAt: Date;
  updatedAt: Date;
  questions: number;
  connectionDate?: Date;

  static relationMappings = {
    questions: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Question',
      join: {
        from: 'collections.id',
        through: {
          // question_collection is the join table.
          from: 'question_collection.collectionId',
          to: 'question_collection.questionId',
        },
        to: 'questions.id',
      },
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: CollectionClass,
      join: {
        from: 'collections.id',
        through: {
          // collection_collection is the join table.
          from: 'collection_collection.collectionId',
          to: 'collection_collection.tagId',
        },
        to: 'collections.id',
      },
    },
    followedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserCollection',
      join: {
        from: 'collections.id',
        to: 'user_collection.collectionId',
      },
    },
  };
}

export default CollectionClass;

export const Collection = CollectionClass.bindKnex(knex);
