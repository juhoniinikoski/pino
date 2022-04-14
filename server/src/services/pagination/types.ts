export interface OrderBy {
  column?: string;
  order?: string;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export interface OrderByObject {
  orderBy: [OrderBy, string];
  column?: string;
  order?: string;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export interface ItemObject {
  column?: string;
  order?: string;
}
