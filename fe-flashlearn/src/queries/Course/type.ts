import { UserResponse } from '@queries';

export enum CourseStatus {
  PUBLIC = 'PUBLIC',
}

export interface CourseResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  status: CourseStatus;
  avgRating: number;
  owner: UserResponse;
  totalVocal: number;
  totalStudent: number;
  createAt: string;
  updateAt: string;
}
