import { ApolloError, AuthenticationError } from 'apollo-server';
import { object, string } from 'yup';
import BlockClass, { Block } from '../../models/Block';
import UserClass from '../../models/User';
import { InvalidIdError } from '../errors';
import { v4 as uuid } from 'uuid';
import { BlockBlock } from '../../models/BlockBlock';

export const getBlocks = async (authorizedUser: UserClass): Promise<BlockClass[]> => {
  const data = await Block.query()
    .where({ createdById: authorizedUser.id, type: 'workspace' })
    .withGraphFetched('content');
  if (!data) {
    throw new ApolloError("Couldn't get workspaces of the user");
  }
  return data;
};

export const getBlock = async (id: string | number): Promise<BlockClass> => {
  const data = await Block.query().findById(id).withGraphFetched('content');
  if (!data) {
    throw new InvalidIdError('getBlock');
  }
  return data;
};

const blockSchema = object({
  title: string().required(),
  type: string().required()
});

interface BlockArgs {
  title: string
  type: string
  parentId?: string | number
}

export const createBlock = async (block: BlockArgs, authorizedUser: UserClass) => {

  if (block.type !== 'workspace' && !block.parentId) {
    throw new ApolloError("Parent block is required.");
  }

  const data = await blockSchema.validate(block);
  const id = uuid();

  await Block.query().insertAndFetch({
    title: data.title,
    type: data.type,
    createdById: authorizedUser.id,
    id: id,
  });

  await BlockBlock.query().insertAndFetch({
    parentId: block.parentId,
    blockId: id
  });

  return id;
  
};

const updateSchema = object({
  type: string(),
  title: string(),
});

export const updateBlock = async (
  id: string | number,
  update: Partial<BlockClass>,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const data = await updateSchema.validate(update);

  const block = await Block.query().findById(id);

  if (block.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the block in order to update it.")
  }

  await Block.query().patchAndFetchById(id, data);

  return id;
};

interface MoveArgs {
  id: string | number
  oldParent: string | number
  newParent: string | number
}

export const moveBlock = async (args: MoveArgs, authorizedUser: UserClass): Promise<string | number> => {

  const block = await Block.query().findById(args.id);
  if (block.createdById !== authorizedUser.id) {
    throw new AuthenticationError("You must be the creator of the block in order to move it.")
  }

  const { id, oldParent, newParent } = args;

  await BlockBlock.query()
    .where({ parentId: oldParent, blockId: id })
    .patch({ parentId: newParent });

  return id;

}
