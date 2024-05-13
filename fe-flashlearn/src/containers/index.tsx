/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CustomDialog, CustomErrorBoundary, LoadingContainer } from '@components';
import { IRootState } from '@redux/store';
import { connect } from 'react-redux';
import { CustomRoute, routerGroup } from './helpers';
import Screen from './StartupContainers/Screen';
import AuthContainer from './StartupContainers/AuthContainer';
const ToastContainer = React.lazy(() => import('./StartupContainers/ToastContainer'));
const NotFound = React.lazy(() => import('./StartupContainers/NotFound'));

type ContainerProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const Container: React.FC<ContainerProps> = ({ isAuthenticated }) => {
  return (
    <Screen>
      <Suspense fallback={<LoadingContainer />}>
        <Routes>
          {routerGroup.map(({ path, element, isRequireAuth }, idx) => (
            <Route
              key={`${path}-${idx}`}
              path={path}
              element={
                <CustomRoute pageRequiredAuth={isRequireAuth} isAuthenticated={isAuthenticated}>
                  {element}
                </CustomRoute>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AuthContainer />
      <ToastContainer />
      <CustomDialog />
      <CustomErrorBoundary showErrorMessage></CustomErrorBoundary>
    </Screen>
  );
};

export default connect(mapStateToProps, undefined)(Container);
