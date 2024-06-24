import { UserResponse } from '@queries/Profile';

export interface StudentResponse {
  id: number;
  user: UserResponse;
  rating: number;
  experience: number;
  createAt: string;
  updateAt: string;
}

export interface AddStudentPayload {
  email: string;
  courseId: string;
}

export interface AddStudentsPayload {
  emailStudents: string[];
  courseId: string;
}

export interface RemoveStudentPayload {
  studentId: number;
  courseId: string;
}

export enum PeriodRank {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'total',
}

export interface GetRankParam {
  courseId: string;
  period: PeriodRank;
}

export interface GetRankResponse {
  id: number;
  user: UserResponse;
  rating: number;
  experience: number;
  totalVocabLearned: number;
  createAt: string;
  updateAt: string;
}
