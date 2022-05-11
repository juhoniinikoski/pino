export interface Channel {
  __typename?: string;
  createdAt: Date;
  updatedAt: Date;
  followedBy: number;
  id: string;
  name: string;
  questions: number;
}

export interface FollowedChannel extends Channel {
  connectionDate: Date;
}

export interface Answer {
  answer: string;
  correct: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  questionId: string;
}

export interface User {
  id: string;
  email: string;
}

export interface Stack {
  __typename?: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  followedBy: number;
  id: string;
  name: string;
  public: boolean;
  questions: number;
  tags: Channel[];
}

export interface FollowedStack extends Stack {
  connectionDate: Date;
}

export interface Question {
  __typename?: string;
  id: string;
  answers: Answer[] | Partial<Answer>[];
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  question: string;
  stacks?: Stack[];
  type: string;
}

export interface Section<T> {
  title: string;
  data: T[] | undefined;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviouPage: boolean;
}

export interface Connection<T> {
  pageInfo: PageInfo;
  totalCount: number;
  edges: Edge<T>[];
}

export interface Edge<T> {
  __typename: string;
  cursor: string;
  node: T;
}
