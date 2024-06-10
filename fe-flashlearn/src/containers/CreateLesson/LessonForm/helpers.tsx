/* eslint-disable react-refresh/only-export-components */
import { LessonPayload } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export enum LessonFormField {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  IMAGE = 'image',
  COURSE_ID = 'courseId',
}

export const lessonInitialValues: LessonPayload = {
  [LessonFormField.ID]: '',
  [LessonFormField.NAME]: '',
  [LessonFormField.DESCRIPTION]: '',
  [LessonFormField.IMAGE]: null,
  [LessonFormField.COURSE_ID]: '',
};

export const LessonFormSchema = yup.object().shape({
  [LessonFormField.NAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [LessonFormField.DESCRIPTION]: yup.string().nullable(),
});
