import { isNumber } from 'lodash';
import normalizeOrderBy from './normalizeOrderBy';
import reverseOrderBy from './reverseOrderBy';
import serializeCursor from './serializeCursor';
import parseCursor from './parseCursor';
import cursorWhere from './cursorWhere';
import { QueryBuilderType } from 'objection';
import { OrderBy, OrderByObject } from './types';

/* eslint-disable */

const getValidLimitOrFail = ({ first, last }: OrderBy) => {

  const limit = isNumber(first) ? first : isNumber(last) ? last : 30;

  if (limit < 0 || limit > 100) {
    throw new Error(
      'Limit must be greater than 0 and less than or equal to 100',
    );
  }

  return limit;
};

const createCursor = (row: any, orderBy: OrderBy[]) => {
  
  const payload = orderBy.map(({ column }) => row[column]);

  return serializeCursor(payload);
};

const cursorPaginate = async (
  builder: QueryBuilderType<any>,
  countBuilder: QueryBuilderType<any>, // countBuilder = builder without joins
  { orderBy: orderByOption, after, before, first, last }: OrderByObject,
) => {
  let orderBy = normalizeOrderBy(orderByOption);

  if (orderBy.length === 0) {
    throw new Error('At least one order by column must be provided');
  }

  if (before) {
    orderBy = reverseOrderBy(orderBy);
  }

  const limit = getValidLimitOrFail({ first, last });

  const cursor = after
    ? parseCursor(after)
    : before
    ? parseCursor(before)
    : null;

  const cursorQuery = cursor
    ? builder.clone().andWhere((b: QueryBuilderType<any>) => cursorWhere(b, orderBy, cursor))
    : builder;
  
  const countQuery = cursor
    ? countBuilder.clone().andWhere((b: QueryBuilderType<any>) => cursorWhere(b, orderBy, cursor))
    : countBuilder;

  const paginationQuery = cursorQuery
    .clone()
    .limit(limit)
    .orderBy(orderBy);

  const cursorCountQuery = countQuery
    .clone()
    .count({ count: '*' })
    .first();

  const totalCountQuery = countBuilder
    .clone()
    .count({ count: '*' })
    .first();

  const [rows, cursorCountObject, totalCountObject] = await Promise.all([
    paginationQuery,
    cursorCountQuery,
    totalCountQuery,
  ]);

  const { count: cursorCount } = cursorCountObject;
  const { count: totalCount } = totalCountObject;

  if (before) {
    rows.reverse();
  }

  const remaining = cursorCount - rows.length;

  const hasNextPage =
    (!before && remaining > 0) ||
    (Boolean(before) && totalCount - cursorCount > 0);

  const hasPreviousPage =
    (Boolean(before) && remaining > 0) ||
    (!before && totalCount - cursorCount > 0);

  const edges = rows.map((node: any) => ({
    node,
    cursor: createCursor(node, orderBy),
  }));

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
  };

  return {
    totalCount,
    edges,
    pageInfo,
  };
};

export default cursorPaginate;