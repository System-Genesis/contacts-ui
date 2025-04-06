import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.tsx';
import NotFound from './error/errorPage.tsx';
import { ErrorEvent } from './matomo/actions.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: Object.values(routes),
    errorElement: <NotFound />,
  },
]);

const Index: React.FC = () => {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (count, error) => {
          if ((error as AxiosError).response?.status === 403) return false;
          return count < 2;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (_error, query) => {
        if (query.meta?.errorMessage) toast.error(query.meta.errorMessage as string);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" toastStyle={{ fontFamily: 'Rubik, sans-serif' }} />
      </CacheProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>,
);

// window.onerror = (message, source, lineno, colno, error) => {
//   console.error('Global error caught:', { message, source, lineno, colno, error });
//   toast.error('אירעה שגיאה, נסה שוב מאוחר יותר.', { theme: 'colored' });
//   ErrorEvent('Global error caught', `${message} ${source}`);
// };
window.onunhandledrejection = (event) => {
  toast.error('אירעה שגיאה, נסה שוב מאוחר יותר.', { theme: 'colored' });
  ErrorEvent('Unhandled promise rejection', event.reason);
};
