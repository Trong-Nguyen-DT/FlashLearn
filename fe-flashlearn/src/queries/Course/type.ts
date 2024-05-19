import { UploadFileType } from '@components';
import { UserResponse } from '@queries';

export enum CourseStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
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

export interface CoursePayload {
  id: string;
  name: string;
  description: string;
  image: UploadFileType;
  status: CourseStatus;
}
