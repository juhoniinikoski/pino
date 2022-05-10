import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Id, Model } from 'objection';

class StackClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'stacks';

  id: string | number;
  name: string;
  public: string | boolean;
  followedBy: number;
  createdById: string | Id;
  createdAt: Date;
  updatedAt: Date;
  questions: number;
  connectionDate?: Date;

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
    },
    tags: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Channel',
      join: {
        from: 'stacks.id',
        through: {
          // stack_channel is the join table.
          from: 'stack_channel.stackId',
          to: 'stack_channel.channelId',
        },
        to: 'channels.id',
      },
    },
    followedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserStack',
      join: {
        from: 'stacks.id',
        to: 'user_stack.stackId',
      },
    },
  };
}

export default StackClass;

export const Stack = StackClass.bindKnex(knex);
