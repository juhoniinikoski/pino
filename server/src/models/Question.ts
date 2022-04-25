import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';
import ChannelClass from './Channel';
import StackClass from './Stack';
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
  channels: ChannelClass[];
  stacks: StackClass[];

  static relationMappings = {
    stacks: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Stack',
      join: {
        from: 'questions.id',
        through: {
          // question_stack is the join table.
          from: 'question_stack.questionId',
          to: 'question_stack.stackId',
        },
        to: 'stacks.id',
      },
    },
    channels: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Channel',
      join: {
        from: 'questions.id',
        through: {
          // question_channel is the join table.
          from: 'question_channel.questionId',
          to: 'question_channel.channelId',
        },
        to: 'channels.id',
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
