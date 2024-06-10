/* eslint-disable react-refresh/only-export-components */
import { UploadFileType } from '@components';
import { PartOfSpeech } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export enum VocabularyFormField {
  VOCABULARY_ID = 'vocabularyId',
  PART_OF_SPEECH = 'partOfSpeech',
  MEANING = 'meaning',
  IMAGE = 'image',
  WORD = 'word',
}

export type VocabularyFormType = {
  vocabularyId: string | number;
  partOfSpeech: PartOfSpeech;
  meaning: string;
  image: UploadFileType;
  word?: string;
};

export const vocalInitialValues: VocabularyFormType = {
  [VocabularyFormField.VOCABULARY_ID]: '',
  [VocabularyFormField.MEANING]: '',
  [VocabularyFormField.IMAGE]: null,
  [VocabularyFormField.PART_OF_SPEECH]: null,
};

export const VocalFormSchema = yup.object().shape({
  [VocabularyFormField.VOCABULARY_ID]: yup
    .string()
    .required(ERROR_MESSAGES.FIELD_REQUIRED)
    .nullable(),
  [VocabularyFormField.MEANING]: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  [VocabularyFormField.PART_OF_SPEECH]: yup
    .string()
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
});

export const partOfSpeechOptions = [
  {
    label: 'Danh Từ',
    value: PartOfSpeech.NOUN,
  },
  {
    label: 'Động Từ',
    value: PartOfSpeech.VERB,
  },
  {
    label: 'Tính Từ',
    value: PartOfSpeech.ADJECTIVE,
  },
  {
    label: 'Trạng Từ',
    value: PartOfSpeech.ADVERB,
  },
  {
    label: 'Đại Từ',
    value: PartOfSpeech.PRONOUN,
  },
  {
    label: 'Giới Từ',
    value: PartOfSpeech.PREPOSITION,
  },
  {
    label: 'Liên Từ',
    value: PartOfSpeech.CONJUNCTION,
  },
  {
    label: 'Thán Từ',
    value: PartOfSpeech.INTERJECTION,
  },
];
