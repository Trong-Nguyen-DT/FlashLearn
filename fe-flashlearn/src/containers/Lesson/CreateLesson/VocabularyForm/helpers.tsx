/* eslint-disable react-refresh/only-export-components */
import { UploadFileType } from '@components';
import { CreateVocabularyErrorResponse, PartOfSpeech } from '@queries';
import { ERROR_MESSAGES } from '@utils';
import * as yup from 'yup';

export enum VocabularyFormField {
  ID = 'id',
  VOCABULARY_ID = 'vocabularyId',
  PART_OF_SPEECH = 'partOfSpeech',
  MEANING = 'meaning',
  IMAGE = 'image',
  WORD = 'word',
}

export type VocabularyFormType = {
  id?: number | string;
  vocabularyId?: string | number;
  partOfSpeech: PartOfSpeech;
  meaning: string;
  image: UploadFileType;
  word?: string;
};

export const vocalInitialValues: VocabularyFormType = {
  [VocabularyFormField.ID]: null,
  [VocabularyFormField.VOCABULARY_ID]: '',
  [VocabularyFormField.MEANING]: '',
  [VocabularyFormField.IMAGE]: null,
  [VocabularyFormField.PART_OF_SPEECH]: null,
};

export const VocalFormSchema = yup.object().shape({
  [VocabularyFormField.VOCABULARY_ID]: yup
    .string()
    .nullable()
    .test('required', ERROR_MESSAGES.FIELD_REQUIRED, (value, context) => {
      const { word } = context.parent;
      if (!word) return value != null;
      return true;
    })
    .test('validWord', 'Từ vựng không tồn tại', (_, context) => {
      const { word } = context.parent;
      const values = context.from[1].value;
      if (
        (values.errors as CreateVocabularyErrorResponse[])?.some(
          (error) => error.word === word && error.message.includes('hợp lệ'),
        )
      )
        return false;
      return true;
    })
    .test('duplicate', 'Từ vựng đã tồn tại trong khóa học', (_, context) => {
      const { word } = context.parent;
      const values = context.from[1].value;
      if (
        (values.errors as CreateVocabularyErrorResponse[])?.some(
          (error) => error.word === word && error.message.includes('đã tồn tại'),
        )
      )
        return false;
      return true;
    })
    .test('unique', 'Không thể chọn từ vựng trùng nhau', (_, context) => {
      const { word, partOfSpeech } = context.parent;
      const values = context.from[1].value;
      const duplicate = (values.vocabulary as VocabularyFormType[])?.filter(
        (vocab) => word === vocab.word && partOfSpeech === vocab.partOfSpeech,
      );
      if (duplicate.length > 1) return false;
      return true;
    }),
  [VocabularyFormField.WORD]: yup
    .string()
    .nullable()
    .test('required', ERROR_MESSAGES.FIELD_REQUIRED, (value, context) => {
      const { vocabularyId } = context.parent;
      if (!vocabularyId) return value != null;
      return true;
    }),
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
