/* eslint-disable react-refresh/only-export-components */
import { CreateVocabularyErrorResponse, LessonPayload } from '@queries';
import * as yup from 'yup';
import { LessonFormSchema, lessonInitialValues } from './LessonForm/helpers';
import { VocabularyFormType, VocalFormSchema } from './VocabularyForm/helpers';

export enum LessonVocabFormField {
  LESSON = 'lesson',
  VOCABULARY = 'vocabulary',
  ERRORS = 'errors',
}

export type LessonVocabForm = {
  lesson: LessonPayload;
  vocabulary: VocabularyFormType[];
  errors: CreateVocabularyErrorResponse[];
};

export const lessonVocabInitialValues: LessonVocabForm = {
  [LessonVocabFormField.LESSON]: lessonInitialValues,
  [LessonVocabFormField.VOCABULARY]: [],
  [LessonVocabFormField.ERRORS]: [],
};

export const LessonVocabFormSchema = yup.object().shape({
  [LessonVocabFormField.LESSON]: LessonFormSchema,
  [LessonVocabFormField.VOCABULARY]: yup.array().of(VocalFormSchema),
});

export const scrollToRef = (ref: React.RefObject<HTMLElement> | null) => {
  if (ref?.current) {
    setTimeout(() => ref.current.scrollIntoView({ behavior: 'smooth' }), 200);
  }
};
