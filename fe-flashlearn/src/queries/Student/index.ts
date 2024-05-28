import studentApi from './studentApi';

export const StudentApi = studentApi.create();

export * from './type';
export * from './useLeaveCourse';
export * from './useJoinCourse';
export * from './useGetStudents';
export * from './useAddStudents';
export * from './useRemoveStudent';