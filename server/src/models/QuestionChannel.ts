import BaseModel from './BaseModel';
import knex from '../utils/knex';

class QuestionChannelClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'question_channel';

  id: string | number;
  questionId: string | number;
  channelId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default QuestionChannelClass;

export const QuestionChannel = QuestionChannelClass.bindKnex(knex);
