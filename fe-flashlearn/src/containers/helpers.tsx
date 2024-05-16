/* eslint-disable react-refresh/only-export-components */
import { PATHS } from '@appConfig/paths';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import Dev from './Dev';
import SplashScreen from './StartupContainers/SplashScreen';
import OnDevelop from './StartupContainers/OnDevelop';
import { SignIn, SignUp } from './UAMContainer';
import { CustomErrorBoundary } from '@components';
import Welcome from './Welcome';
import Course from './Course';

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

  if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
    return <CustomErrorBoundary showErrorMessage>{children}</CustomErrorBoundary>;
  }

  const redirectPath = isAuthenticated ? PATHS.root : PATHS.signIn;

  return <Navigate to={redirectPath} />;
};

export const routerGroup = [
  { path: PATHS.root, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.welcome, element: <Welcome />, isRequireAuth: false },
  { path: PATHS.courses, element: <Course />, isRequireAuth: false },
  { path: PATHS.signIn, element: <SignIn />, isRequireAuth: false },
  { path: PATHS.signUp, element: <SignUp />, isRequireAuth: false },
  { path: PATHS.forgotPassword, element: <OnDevelop />, isRequireAuth: false },
  { path: PATHS.resetPassword, element: <OnDevelop />, isRequireAuth: false },
  { path: PATHS.dashboard, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.profile, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.dev, element: <Dev />, isRequireAuth: true },
];
