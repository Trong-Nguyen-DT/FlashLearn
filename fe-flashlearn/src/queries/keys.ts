import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/user',
  STUDENT = '/student',
  LESSON = '/lesson',
  LESSON_DETAIL = '/lesson-detail',
  AUTH = '/auth',
  COURSE = '/course',
  VOCABULARY = '/vocabulary',
  MY_LEARNING_COURSE = '/my-learningcourse',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
