import { UploadFileType } from '@components';

export interface LessonResponse {
  id: number;
  name: string;
  description: string;
  learned: boolean;
  totalVocabLearned: number;
  image: string;
  totalVocabOfLesson: number;
  createAt: string;
  updateAt: string;
}

export type LessonParams = {
  courseId: string;
};

export interface LessonPayload {
  id: string;
  name: string;
  description: string;
  image: UploadFileType;
  courseId: string;
}
