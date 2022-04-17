import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Id, Model } from 'objection';

class StackClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'stacks';

  id: string | number;
  name: string;
  public: string | boolean;
  createdById: string | Id;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings = {
    questions: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Question',
      join: {
        from: 'stacks.id',
        through: {
          // question_stack is the join table.
          from: 'question_stack.stackId',
          to: 'question_stack.questionId',
        },
        to: 'questions.id',
      },
    }
  };
}

export default StackClass;

export const Stack = StackClass.bindKnex(knex);
