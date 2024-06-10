/* eslint-disable react-refresh/only-export-components */
import { LessonPayload } from '@queries';
import * as yup from 'yup';
import { LessonFormSchema, lessonInitialValues } from './LessonForm/helpers';
import { VocabularyFormType, VocalFormSchema } from './VocabularyForm/helpers';

export enum LessonVocabFormField {
  LESSON = 'lesson',
  VOCABULARY = 'vocabulary',
}

export type LessonVocabForm = {
  lesson: LessonPayload;
  vocabulary: VocabularyFormType[];
  
};

export const lessonVocabInitialValues: LessonVocabForm = {
  [LessonVocabFormField.LESSON]: lessonInitialValues,
  [LessonVocabFormField.VOCABULARY]: [],
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
