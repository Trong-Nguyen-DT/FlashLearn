import { UploadFileType } from '@components';

export enum PartOfSpeech {
  NOUN = 'NOUN',
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  ADVERB = 'ADVERB',
  PRONOUN = 'PRONOUN',
  PREPOSITION = 'PREPOSITION',
  CONJUNCTION = 'CONJUNCTION',
  INTERJECTION = 'INTERJECTION',
}

export interface VocabularyResponse {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: PartOfSpeech;
  createAt: string;
  updateAt: string;
}

export interface VocabularyOfLessonResponse {
  id: number;
  vocabulary: VocabularyResponse;
  image: string;
  meaning: string;
  createAt: string;
  updateAt: string;
}

export interface VocabularyPayload {
  word: string;
  partOfSpeech: PartOfSpeech;
}

export interface VocabularyOfLessonPayload {
  id?: number;
  vocabularyId: number;
  meaning: string;
  image?: UploadFileType;
  delete?: boolean;
}

export interface VocabulariesOfLessonPayload {
  lessonId: number;
  vocabularies: VocabularyOfLessonPayload[];
}

export interface VocabulariesPayload {
  vocabularies: VocabularyPayload[];
}

export interface CreateVocabularyErrorResponse {
  word: string;
  message: string;
}
export interface CreateVocabulariesResponse {
  vocabularies: VocabularyResponse[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: CreateVocabularyErrorResponse[];
}
