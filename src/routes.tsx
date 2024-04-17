import { ReactNode } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import Sales from './components/sales/Sales.tsx';
import Clients from './components/clients/Clients.tsx';
import Inventory from './components/inventory/Inventory.tsx';
import { TitleContextProvider } from './context/TitleContext.tsx';

export default function Router(): ReactNode {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <TitleContextProvider>
          <MiniDrawer />
        </TitleContextProvider>
      ),
      children: [
        {
          path: '/panel',
          element: <Dashboard />
        },
        {
          path: '/ventas',
          element: <Sales />
        },  
        {
          path: '/clientes',
          element: <Clients />
        },
        {
          path: '/inventario',
          element: <Inventory />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/recents" replace />,
    },
  ];

  const routesElement = useRoutes(routes);

  return routesElement;
}
