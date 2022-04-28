import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class ChannelClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'channels';

  id: string | number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  followedBy: number;
  questions: number;

  static relationMappings = {
    questions: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Question',
      join: {
        from: 'channels.id',
        through: {
          // question_channel is the join table.
          from: 'question_channel.channelId',
          to: 'question_channel.questionId',
        },
        to: 'questions.id',
      },
    },
    followedBy: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/UserChannel',
      join: {
        from: 'channels.id',
        to: 'user_channel.channelId',
      },
    },
  };
}

export default ChannelClass;

export const Channel = ChannelClass.bindKnex(knex);
