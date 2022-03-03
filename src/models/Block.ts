import BaseModel from './BaseModel';
import knex from '../utils/knex';
import { Model } from 'objection';

class BlockClass extends BaseModel {
  static idColumn = 'id';

  static tableName = 'blocks';

  static relationMappings = {
    content: {
      relation: Model.ManyToManyRelation,
      modelClass: BlockClass,
      join: {
        from: 'blocks.id',
        through: {
          // block_block is the join table.
          from: 'block_block.parentId',
          to: 'block_block.blockId',
        },
        to: 'blocks.id',
      },
    },
  };

  id: string | number;
  createdById: string | number;
  title: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  content: BlockClass[];
}

export default BlockClass;

export const Block = BlockClass.bindKnex(knex);
