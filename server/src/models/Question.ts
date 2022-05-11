import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';
import collectionClass from './collection';
import CollectionClass from './Collection';
import AnswerClass from './Answer';

class QuestionClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'questions';

  id: string | number;
  question: string;
  type: string;
  createdById: string | number;
  createdAt: Date;
  updatedAt: Date;
  answers: Partial<AnswerClass>[];
  collections: CollectionClass[];

  static relationMappings = {
    collections: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Collection',
      join: {
        from: 'questions.id',
        through: {
          // question_collection is the join table.
          from: 'question_collection.questionId',
          to: 'question_collection.collectionId',
        },
        to: 'collections.id',
      },
    },
    answers: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Answer',
      join: {
        from: 'questions.id',
        to: 'answers.questionId',
      },
    },
  };
}

export default QuestionClass;

export const Question = QuestionClass.bindKnex(knex);
