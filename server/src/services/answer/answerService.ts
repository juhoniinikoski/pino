import { ApolloError, AuthenticationError } from "apollo-server";
import { boolean, object, string } from "yup";
import AnswerClass, { Answer } from "../../models/Answer";
import { Question } from "../../models/Question";
import UserClass from "../../models/User";
import { InvalidIdError } from "../errors";
import { getQuestion } from "../question/questionService";
import { v4 as uuid } from "uuid";

interface Answer {
  answer: string
  correct: boolean
}

export const getAnswer = async (id: string | number): Promise<AnswerClass> => await Answer.query().findById(id);

export const getAnswers = async (): Promise<AnswerClass[]> => await Answer.query();

const answerSchema = object({
  answer: string().required(),
  correct: boolean().required(),
  questionId: string().required()
});

export const createAnswer = async (answer: Partial<AnswerClass>, authorizedUser: UserClass): Promise<string> => {
  const data = await answerSchema.validate(answer);

  const question = await Question.query().findById(data.questionId);

  if (question.createdById === authorizedUser.id) {
    const id = uuid();

    await Answer.query().insertAndFetch({
      ...data,
      id: id,
    });

    return id;
  }

  throw new AuthenticationError("You can only create answers to questions you have made.");

};

const updateSchema = object({
  answer: string(),
  correct: boolean(),
});

export const updateAnswer = async (
  id: string | number,
  answer: Answer,
  authorizedUser: UserClass,
): Promise<string | number> => {
  const data = await updateSchema.validate(answer);

  const ans = await Answer.query().findById(id);
  const question = await Question.query().findById(ans.questionId);

  if (authorizedUser.id !== question.createdById) {
    throw new AuthenticationError('You can only update the answer if you are the creator of related question.');
  }

  await Answer.query().patchAndFetchById(id, { answer: data.answer, correct: data.correct });

  return id;
};

export const deleteAnswer = async (id: string | number, authorizedUser: UserClass): Promise<boolean> => {
  const ans = await Answer.query().findById(id);
  const question = await getQuestion(ans.questionId);

  if (question.answers.length < 2) {
    throw new ApolloError("You cannot delete all the answers.")
  }

  else if (authorizedUser.id === question.createdById) {
    const res = await Answer.query().findById(id).delete();
    if (res === 0) {
      throw new InvalidIdError('deleteAnswer');
    }
    return true;
  }

  throw new AuthenticationError('You can only delete the answer if you have made it.');
};