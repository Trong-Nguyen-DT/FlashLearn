export interface LessonResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  totalVocabOfLesson: number;
  createAt: string;
  updateAt: string;
}

export type LessonParams = {
  courseId: string;
};
