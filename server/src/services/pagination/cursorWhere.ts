import { QueryBuilderType } from 'objection';
import { OrderBy } from './types';

/* eslint-disable */

const recursiveCursorWhere = (builder: QueryBuilderType<any>, comparisons: any[], composites: any) => {
  const comparison = comparisons[0];
  composites = [comparison, ...composites];
  const op = comparison.order === 'asc' ? '>' : '<';

  builder.andWhere(function(this: any) {
    this.where(comparison.column, op, comparison.value);

    if (comparisons.length > 1) {
      this.orWhere(function(this: any) {
        for (const composite of composites) {
          this.andWhere(composite.column, composite.value);
        }

        this.andWhere(function(this: any) {
          recursiveCursorWhere(this, comparisons.slice(1), composites);
        });
      });
    }
  });
};

const cursorWhere = (builder: QueryBuilderType<any>, orderBy: OrderBy[], cursor: string) => {
  if (!cursor) {
    return builder;
  }

  const comparisons = orderBy.map(({ column, order }, index: number) => ({
    column,
    order,
    value: cursor[index],
  }));

  recursiveCursorWhere(builder, comparisons, []);
};

export default cursorWhere;