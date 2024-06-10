export enum TypeQuestion {
  FILL_THE_BLANK_CHOICE = 'FILL_THE_BLANK_CHOICE',
  LISTENING_TO_WORD = 'LISTENING_TO_WORD',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  WORD_TO_LISTENING = 'WORD_TO_LISTENING',
  TRANSLATE = 'TRANSLATE',
  FILL_THE_BLANK = 'FILL_THE_BLANK',
}

export interface NewWordResponse {
  id: number;
  word: string;
  meaning: string;
  image: string;
  partOfSpeech: string;
}

export interface AnswerResponse {
  title: string;
  correct: boolean;
}

export interface QuestionResponse {
  id: 5;
  typeQuestion: TypeQuestion;
  question: string;
  answers: AnswerResponse[];
}

export interface LearnQuestionResponse {
  vocabularyNew: NewWordResponse[];
  vocabularyOld: NewWordResponse[];
  questions: QuestionResponse[];
}

export interface ProgressPayload {
  id: number;
  quality: number;
}

export interface updateLearnProgressPayload {
  courseId: string;
  learningVocabularies: ProgressPayload[];
}
