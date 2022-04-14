import QuestionClass, { Question } from '../../models/Question';
import { v4 as uuid } from 'uuid';
import UserClass from '../../models/User';
import { array, boolean, object, string } from 'yup';
import { AuthenticationError } from 'apollo-server';
import { InvalidIdError } from '../errors';
import AnswerClass from '../../models/Answer';

interface Args {
  first?: number;
  after?: string;
  orderBy?: string;
  stackId?: number | string;
  channelId?: number | string;
  createdBy?: number | string;
}

export const getQuestions = async (args: Args): Promise<QuestionClass[]> => {
  let query = Question.query();

  if (args.stackId) {
    query = query.withGraphJoined('stacks').where('stacks.id', args.stackId);
  }

  if (args.channelId) {
    query = query.withGraphJoined('channels').where('channels.id', args.channelId);
  }

  if (args.createdBy) {
    query = query.where('createdById', args.createdBy);
  }

  return await query.withGraphJoined('answers');
};

const questionSchema = object({
  question: string().required(),
  type: string().required(),
  publish: boolean().required(),
  answers: array(
    object({
      answer: string().required(),
      correct: boolean().required()
    })
  )
});

export const getQuestion = async (id: string | number): Promise<QuestionClass> => await Question.query().findById(id);

export const createQuestion = async (question: Partial<QuestionClass>, authorizedUser: UserClass): Promise<string> => {
  const data = await questionSchema.validate(question);

  const id = uuid();

  const { answers } = question;

  const answersWithId: Partial<AnswerClass>[] = answers.map(a => ({
    answer: a.answer,
    correct: a.correct,
    questionId: id
  }))

  // await Question.query().insertAndFetch({
  //   ...data,
  //   createdById: authorizedUser.id,
  //   id: id,
  // });

  await Question.query().insertGraph({
    id: id,
    question: data.question,
    type: data.type,
    createdById: authorizedUser.id,
    publish: data.publish,
    answers: answersWithId
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

  throw new AuthenticationError("You must be the creator of the question in order to delete it.");

};
