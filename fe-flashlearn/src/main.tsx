import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@appConfig/theme';
import { BrowserRouter } from 'react-router-dom';
import { DialogProvider, LoadingContainer } from '@components';
import { Provider } from 'react-redux';
import createStore from '@redux/store';
import Containers from './containers';

const { store } = createStore();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DialogProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Suspense fallback={<LoadingContainer />}>
                <Containers />
              </Suspense>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </DialogProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
