import { OrderBy } from './types';

const reverseOrderBy = (orderBy: OrderBy[]) => {
  return orderBy.map(({ column, order }) => ({
    column,
    order: order === 'desc' ? 'asc' : 'desc',
  }));
};

export default reverseOrderBy;
