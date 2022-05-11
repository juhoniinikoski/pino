import BaseModel from './BaseModel';
import knex from '../utils/knex';

class QuestionCollectionClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'question_collection';

  id: string | number;
  questionId: string | number;
  collectionId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default QuestionCollectionClass;

export const QuestionCollection = QuestionCollectionClass.bindKnex(knex);
