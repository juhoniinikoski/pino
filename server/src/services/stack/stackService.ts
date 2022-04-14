import StackClass, { Stack } from '../../models/Stack';

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  public?: boolean;
  createdBy?: number | string;
}

export const getStacks = async (args: Args): Promise<StackClass[]> => {
  const order = args.orderBy ? args.orderBy : 'createdAt';

  let query = Stack.query();

  if (args.public) {
    query = query.where('public', true);
  }

  if (args.createdBy) {
    query = query.where('createdById', args.createdBy);
  }

  return await query.orderBy(order);
};

export const getStack = async (id: string | number): Promise<StackClass> => await Stack.query().findById(id);
