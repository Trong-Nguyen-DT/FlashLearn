import { LearnQuestionResponse, NewWordResponse, QuestionResponse } from '@queries';

export enum StepType {
  QUESTION = 'QUESTION',
  NEW_WORD = 'NEW_WORD',
  MATCHING = 'MATCHING',
  MESSAGE = 'MESSAGE',
  PREVIEW = 'PREVIEW',
}
export type StepContent = {
  type: StepType;
  question?: QuestionResponse;
  newWord?: NewWordResponse;
  message?: string;
  repeat?: number;
};

export const getInitStepContent = (learnContent: LearnQuestionResponse): StepContent[] => {
  if (learnContent) {
    const newWordSteps: StepContent[] =
      learnContent.vocabularyNew?.map((item) => ({
        newWord: item,
        type: StepType.NEW_WORD,
      })) ?? [];
    const questionSteps: StepContent[] =
      learnContent.questions?.map((item) => ({
        question: item,
        type: StepType.QUESTION,
        repeat: 0,
      })) ?? [];
    const previewSteps: StepContent = {
      type: StepType.PREVIEW,
    };
    return [...newWordSteps, ...questionSteps, previewSteps];
  } else return [];
};
