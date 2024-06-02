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
  emailStudents: string[];
  courseId: string;
}

export interface RemoveStudentPayload {
  studentId: number;
  courseId: string;
}
