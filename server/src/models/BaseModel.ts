import { Model, Page, QueryBuilder, Transaction } from 'objection';
import cursorPaginateStack from '../services/pagination/cursorPaginateStack';
import cursorPaginateQuestion from '../services/pagination/cursorPaginateQuestion';
import cursorPaginate from '../services/pagination/cursorPaginate';

/* eslint-disable */

export class BaseQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  // These are necessary. You can just copy-paste them and change the
  // name of the query builder class.
  ArrayQueryBuilderType!: BaseQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: BaseQueryBuilder<M, M>;
  MaybeSingleQueryBuilderType!: BaseQueryBuilder<M, M | undefined>;
  NumberQueryBuilderType!: BaseQueryBuilder<M, number>;
  PageQueryBuilderType!: BaseQueryBuilder<M, Page<M>>;

  cursorPaginate(that: QueryBuilder<M, R>, options: any) {
    return cursorPaginate(this, that, options);
  }
  cursorPaginateStack(that: QueryBuilder<M, R>, options: any) {
    return cursorPaginateStack(this, that, options);
  }
  
  cursorPaginateQuestion(options: any) {
    return cursorPaginateQuestion(this, options);
  }
  
}

class BaseModel extends Model {

  QueryBuilderType!: BaseQueryBuilder<this>;
  static QueryBuilder = BaseQueryBuilder;

  static useLimitInFirst = true;

  static relatedQuery(str?: string, trx?: Transaction): BaseQueryBuilder<BaseModel, BaseModel[]> {
    return <any> super.relatedQuery(str, trx);
  }

  $beforeInsert(this: any) {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }

  $beforeUpdate(this: any) {
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }

}

export default BaseModel;