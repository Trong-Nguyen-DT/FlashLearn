import courseApi from './courseApi';

export const CourseApi = courseApi.create();

export * from './useGetAllCourse';
export * from './useGetCourseDetail';
export * from './useGetMyLearningCourse';
export * from './useGetMyTeachingCourse';
export * from './useAddCourse';
export * from './useDeleteCourse';
export * from './type';
export * from './useRateCourse';
