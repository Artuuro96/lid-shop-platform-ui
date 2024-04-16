import { ReactNode } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Frame from './components/frame/Frame.tsx';

export default function Router(): ReactNode {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Frame />
    },
    {
      path: '*',
      element: <Navigate to="/recents" replace />,
    },
  ];

  const routesElement = useRoutes(routes);

  return routesElement;
}
