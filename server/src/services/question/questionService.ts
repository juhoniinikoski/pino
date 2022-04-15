import QuestionClass, { Question } from '../../models/Question';
import { v4 as uuid } from 'uuid';
import UserClass from '../../models/User';
import { array, boolean, number, object, string } from 'yup';
import { AuthenticationError } from 'apollo-server';
import { InvalidIdError } from '../errors';
import AnswerClass from '../../models/Answer';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  orderDirection?: string;
  searchKeyword?: string;
  stackId?: number | string;
  channelId?: number | string;
  createdBy?: number | string;
}

interface EdgeType {
  cursor: string;
  node: QuestionClass;
}

interface PageInfoType {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface QuestionConnection {
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
  channelId: string().trim(),
  stackId: string().trim(),
});

const getLikeFilter = (value: string) => `%${value}%`;

export const getQuestions = async (args: Args): Promise<QuestionConnection> => {
  const normalizedArgs = await argsSchema.validate(args);

  const { first, orderDirection, after, searchKeyword, createdBy, stackId, channelId } = normalizedArgs;

  let query = Question.query();

  if (stackId) {
    query = query.whereExists(Question.relatedQuery('stacks').where('stacks.id', stackId));
  }

  if (channelId) {
    query = query.whereExists(Question.relatedQuery('channels').where('channels.id', channelId));
  }

  if (createdBy) {
    query = query.where('createdById', createdBy);
  }

  if (searchKeyword) {
    const likeFilter = getLikeFilter(searchKeyword);

    query = query.where((qb) => {
      return qb.where('question', 'like', likeFilter);
    });
  }

  return await query.cursorPaginateQuestion({
    first,
    after,
    orderBy: [{ column: 'createdAt', order: orderDirection.toLowerCase() }, 'id'],
  });
};

const questionSchema = object({
  question: string().required(),
  type: string().required(),
  publish: boolean().required(),
  answers: array(
    object({
      answer: string().required(),
      correct: boolean().required(),
    }),
  ),
});

export const getQuestion = async (id: string | number): Promise<QuestionClass> => await Question.query().findById(id);

export const createQuestion = async (question: Partial<QuestionClass>, authorizedUser: UserClass): Promise<string> => {
  const data = await questionSchema.validate(question);

  const id = uuid();

  const { answers } = question;

  const answersWithId: Partial<AnswerClass>[] = answers.map((a) => ({
    answer: a.answer,
    correct: a.correct,
    questionId: id,
  }));

  await Question.query().insertGraph({
    id: id,
    question: data.question,
    type: data.type,
    createdById: authorizedUser.id,
    publish: data.publish,
    answers: answersWithId,
  });

  return id;
};

const updateSchema = object({
  question: string(),
  type: string(),
  id: string().required(),
});

export const updateQuestion = async (
  question: Partial<QuestionClass>,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const data = await updateSchema.validate(question);

  const initialQuestion = await getQuestion(data.id);

  if (initialQuestion.createdById !== authorizedUser.id) {
    throw new AuthenticationError('You must be the creator of the question in order to update it.');
  }

  await Question.query().patchAndFetchById(data.id, data);

  return data.id;
};

export const deleteQuestion = async (id: string | number, authorizedUser: UserClass): Promise<boolean> => {
  const question = await Question.query().findById(id);

  if (authorizedUser.id === question.createdById) {
    const res = await Question.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteQuestion');
    }
    return true;
  }

  throw new AuthenticationError('You must be the creator of the question in order to delete it.');
};
