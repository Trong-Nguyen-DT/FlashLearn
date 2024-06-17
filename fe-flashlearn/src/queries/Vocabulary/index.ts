import vocabularyApi from './vocabularyApi';

export const VocabularyApi = vocabularyApi.create();

export * from './type';
export * from './useGetVocabularyOfLesson';
export * from './useGetAllVocabulary';
export * from './useAddVocabulary';
export * from './useAddVocabularies';
export * from './useAddVocabulariesOfLesson';
export * from './useUpdateVocabulariesOfLesson';
