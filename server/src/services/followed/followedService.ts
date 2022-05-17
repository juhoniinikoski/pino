import { number, object, string } from 'yup';
import CollectionClass, { Collection } from '../../models/Collection';
import { UserCollection } from '../../models/UserCollection';
import { PageInfoType } from '../../utils/entities';
import AuthService from '../authentication/authService';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
}

interface EdgeType {
  cursor: string;
  node: CollectionClass;
}

interface CollectionConnection {
  totalCount: number;
  pageInfo: PageInfoType;
  edges: EdgeType[];
}

const argsSchema = object({
  after: string(),
  first: number().min(1).max(30).default(30),
  orderDirection: string().default('desc'),
  orderBy: string().default('createdAt'),
  searchKeyword: string().trim(),
});

const getLikeFilter = (value: string) => `%${value}%`;

export const getFollowed = async (args: Args, authService: AuthService): Promise<CollectionConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, orderBy, after, searchKeyword } = normalizedArgs;

  const user = await authService.getAuthorizedUserOrFail();
  let query = Collection.query().where(
    'id',
    'in',
    UserCollection.query().where('userId', user.id).select('collectionId'),
  );

  if (searchKeyword) {
    const likeFilter = getLikeFilter(searchKeyword);

    query = query.where((qb) => {
      return qb.where('name', 'like', likeFilter);
    });
  }

  const count = query.clone();

  query = query.select(
    '*',
    Collection.relatedQuery('followedBy').where('userId', user.id).select('createdAt').as('connectionDate'),
  );

  query = query.select(
    '*',
    Collection.relatedQuery('questions').count().as('questions'),
    Collection.relatedQuery('followedBy').count().as('followedBy'),
  );

  return await query.cursorPaginateStack(count, {
    first,
    after,
    orderBy: [{ column: orderBy, order: orderDirection.toLowerCase() }, 'id'],
  });
};
