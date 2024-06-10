/* eslint-disable react-refresh/only-export-components */
import { PATHS } from '@appConfig/paths';
import { CustomErrorBoundary } from '@components';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import CourseDetail from './CourseDetail';
import CourseList from './CourseList';
import CreateCourse from './CreateCourse';
import Dev from './Dev';
import OnDevelop from './StartupContainers/OnDevelop';
import SplashScreen from './StartupContainers/SplashScreen';
import { SignIn, SignUp } from './UAMContainer';
import Welcome from './Welcome';
import MyCourse from './MyCourse';
import Learn from './Learn';
import CreateLesson from './CreateLesson';

type RouteWrapperProps = {
  isAuthenticated: boolean;
  pageRequiredAuth?: boolean;
  pageForAuthentication?: boolean;
};

export const CustomRoute: React.FC<PropsWithChildren<RouteWrapperProps>> = ({
  isAuthenticated,
  pageRequiredAuth,
  children,
}) => {
  if (isAuthenticated === null) return <SplashScreen />;

  if (isAuthenticated || !pageRequiredAuth) {
    return <CustomErrorBoundary showErrorMessage>{children}</CustomErrorBoundary>;
  }

  const redirectPath = isAuthenticated ? PATHS.root : PATHS.signIn;

  return <Navigate to={redirectPath} />;
};

export const routerGroup = [
  { path: PATHS.root, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.welcome, element: <Welcome />, isRequireAuth: false },
  { path: PATHS.signIn, element: <SignIn />, isRequireAuth: false },
  { path: PATHS.signUp, element: <SignUp />, isRequireAuth: false },
  { path: PATHS.forgotPassword, element: <OnDevelop />, isRequireAuth: false },
  { path: PATHS.resetPassword, element: <OnDevelop />, isRequireAuth: false },
  { path: PATHS.courses, element: <CourseList />, isRequireAuth: false },
  { path: PATHS.courseCreate, element: <CreateCourse />, isRequireAuth: true },
  { path: PATHS.courseDetail, element: <CourseDetail />, isRequireAuth: false },
  { path: PATHS.courseSetting, element: <CourseDetail />, isRequireAuth: true },
  { path: PATHS.lessonsList, element: <CourseDetail />, isRequireAuth: false },
  { path: PATHS.learning, element: <Learn />, isRequireAuth: true },
  { path: PATHS.practiceLesson, element: <Learn />, isRequireAuth: true },
  { path: PATHS.practiceCourse, element: <Learn />, isRequireAuth: true },
  { path: PATHS.lessonsCreate, element: <CreateLesson />, isRequireAuth: true },
  { path: PATHS.lessonsUpdate, element: <CreateLesson />, isRequireAuth: true },
  { path: PATHS.practice, element: <CourseDetail />, isRequireAuth: true },
  { path: PATHS.rankList, element: <CourseDetail />, isRequireAuth: true },
  { path: PATHS.rankList, element: <CourseDetail />, isRequireAuth: true },
  { path: PATHS.studentsList, element: <CourseDetail />, isRequireAuth: true },
  { path: PATHS.lessonsDetail, element: <CourseDetail />, isRequireAuth: false },
  { path: PATHS.myCourse, element: <MyCourse />, isRequireAuth: true },
  { path: PATHS.myCourseLearning, element: <MyCourse />, isRequireAuth: true },
  { path: PATHS.myCourseTeaching, element: <MyCourse />, isRequireAuth: true },
  { path: PATHS.dashboard, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.profile, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.dev, element: <Dev />, isRequireAuth: true },
];
