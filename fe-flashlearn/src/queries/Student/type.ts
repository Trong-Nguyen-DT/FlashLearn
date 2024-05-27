import { UserResponse } from '@queries/Profile';

export interface StudentResponse {
  id: number;
  user: UserResponse;
  rating: number;
  createAt: string;
  updateAt: string;
}
