import courseApi from './courseApi';

export const CourseApi = courseApi.create();

export * from './useGetAllCourse';
export * from './useGetCourseDetail';
export * from './useGetMyLearningCourse';
export * from './useAddCourse';
export * from './type';
