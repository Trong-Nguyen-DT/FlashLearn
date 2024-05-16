import { vocabularyResponse } from '@queries';

export interface LessonResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  course: null;
  createAt: string;
  updateAt: string;
  vocabularies: [
    {
      id: number;
      lesson: null;
      vocabulary: vocabularyResponse;
      createAt: '2024-05-13T17:08:39';
      updateAt: '2024-05-13T17:08:40';
      learningHistories: null;
    },
  ];
}
