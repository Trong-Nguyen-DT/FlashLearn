export enum PartOfSpeech {
  NOUN = 'NOUN',
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
