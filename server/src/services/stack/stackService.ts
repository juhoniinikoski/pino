import { boolean, number, object, string } from 'yup';
import StackClass, { Stack } from '../../models/Stack';
import { PageInfoType } from '../../utils/entities';

interface Args {
  id?: string | number;
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  createdBy?: number | string;
  public?: boolean;
}

interface EdgeType {
  cursor: string;
  node: StackClass;
}

interface StackConnection {
  totalCount: number;
  pageInfo: PageInfoType;
  edges: EdgeType[];
}

const argsSchema = object({
  after: string(),
  first: number().min(1).max(30).default(30),
  orderDirection: string().default('DESC'),
  orderBy: string().default('CREATED_AT'),
  searchKeyword: string().trim(),
  createdBy: string().trim(),
  public: boolean()
});

const getLikeFilter = (value: string) => `%${value}%`;

export const getStacks = async (args: Args): Promise<StackConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, after, searchKeyword, createdBy, public: publicStack } = normalizedArgs;

  let query = Stack.query();

  if (publicStack) {
    query = query.where('public', true);
  }

  if (createdBy) {
    query = query.where('createdById', args.createdBy);
  }

  if (searchKeyword) {
    const likeFilter = getLikeFilter(searchKeyword);

    query = query.where((qb) => {
      return qb.where('name', 'like', likeFilter);
    });
  }

  query = query.select(
    '*',
    Stack.relatedQuery('questions')
      .count()
      .as('questions')
  );

  console.log(await query.clone().groupBy('stacks.id').count('*'))

  return await query.groupBy('stacks.id').cursorPaginate({
    first,
    after,
    orderBy: [{ column: 'createdAt', order: orderDirection.toLowerCase() }, 'id'],
  });
};

export const getStack = async (id: string | number): Promise<StackClass> => 
  await Stack.query().findById(id).select(
    '*',
    Stack.relatedQuery('questions')
      .count()
      .as('questions')
  );
