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
// import './i18n/index.ts';
import { AxiosError } from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: Object.values(routes),
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
        <ToastContainer position="bottom-right" />
      </CacheProvider>
      <ReactQueryDevtools buttonPosition="bottom-left" />
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
