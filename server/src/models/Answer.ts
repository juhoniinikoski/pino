import BaseModel from './BaseModel';
import knex from '../utils/knex';

class AnswerClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'answers';

  id: string | number;
  questionId: string | number;
  answer: string;
  correct: string;
  createdAt: Date;
  updatedAt: Date;
}

export default AnswerClass;

export const Answer = AnswerClass.bindKnex(knex);
