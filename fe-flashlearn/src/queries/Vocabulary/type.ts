export enum PartOfSpeech {
  NOUN = 'NOUN',
}

export interface vocabularyResponse {
  id: number;
  word: string;
  meaning: string;
  image: string;
  audio: string;
  partOfSpeech: PartOfSpeech;
  createAt: string;
  updateAt: string;
  similarWords: [];
}
