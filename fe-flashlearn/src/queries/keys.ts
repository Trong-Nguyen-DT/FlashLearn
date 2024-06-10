import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/user',
  STUDENT = '/student',
  LESSON = '/lesson',
  LESSON_DETAIL = '/lesson-detail',
  AUTH = '/auth',
  COURSE = '/course',
  LEARN = '/learn',
  PRACTICE = '/practice',
  PRACTICE_LESSON = '/practice-lesson',
  PRACTICE_COURSE = '/practice-course',
  PRACTICE_COURSE_LISTENING = '/practice-course-listening',
  VOCABULARY = '/vocabulary',
  VOCABULARY_LESSON = '/vocabulary-lesson',
  RANK = '/rank',
  MY_LEARNING_COURSE = '/my-learning-course',
  MY_TEACHING_COURSE = '/my-teaching-course',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
