import Home from './pages/home';
// import Search from './pages/search';

const routes = {
  main: {
    path: '/',
    element: <Home />,
  },
  search: {
    path: '/search',
    // element: <Search />,
    element: <></>,
  },

  unauthorized: { path: '/unauthorized', element: <div>unauthorized</div>, hidden: true },
};

export default routes as Record<
  string,
  {
    path: string;
    element: JSX.Element;
  }
>;
