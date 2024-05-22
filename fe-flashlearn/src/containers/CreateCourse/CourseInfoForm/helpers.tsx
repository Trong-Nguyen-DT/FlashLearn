/* eslint-disable react-refresh/only-export-components */
import { CoursePayload, CourseStatus } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export enum CourseFormField {
  'ID' = 'id',
  'NAME' = 'name',
  'DESCRIPTION' = 'description',
  'IMAGE' = 'image',
  'STATUS' = 'status',
}

export const courseInitialValues: CoursePayload = {
  [CourseFormField.ID]: '',
  [CourseFormField.NAME]: '',
  [CourseFormField.DESCRIPTION]: '',
  [CourseFormField.IMAGE]: null,
  [CourseFormField.STATUS]: CourseStatus.PUBLIC,
};

export const CourseFormSchema = yup.object().shape({
  [CourseFormField.NAME]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
  [CourseFormField.DESCRIPTION]: yup.string().nullable(),
  [CourseFormField.STATUS]: yup.string().required(ERROR_MESSAGES.FIELD_REQUIRED).nullable(),
});

export const courseStatusOptions = [
  { label: 'Công Khai', value: CourseStatus.PUBLIC },
  { label: 'Riêng Tư', value: CourseStatus.PRIVATE },
];
