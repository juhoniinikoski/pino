import BaseModel from './BaseModel';
import knex from '../utils/knex';
import ChannelClass from './Channel';
import StackClass from './Stack';
import { Model } from 'objection';

class UserClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'users';

  id: string | number;
  email: string;
  password: string;
  followedChannels: ChannelClass[];
  followedStacks: StackClass[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings = {
    followedChannels: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Channel',
      join: {
        from: 'users.id',
        through: {
          // user_channel is the join table.
          from: 'user_channel.userId',
          to: 'user_channel.channelId',
        },
        to: 'channels.id',
      },
    },
    followedStacks: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Stack',
      join: {
        from: 'users.id',
        through: {
          // user_channel is the join table.
          from: 'user_stack.userId',
          to: 'user_stack.stackId',
        },
        to: 'stacks.id',
      },
    },
  };
}

export default UserClass;

export const User = UserClass.bindKnex(knex);
