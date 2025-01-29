import { ReactNode, useEffect } from 'react';
import { RouteObject, useNavigate, useRoutes } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import Sales from './components/sales/Sales.tsx';
import Clients from './components/clients/Clients.tsx';
import Inventory from './components/inventory/Inventory.tsx';
import Login from './components/login/Login.tsx'; // Importa el componente de Login
import { TitleContextProvider } from './context/TitleContext.tsx';
import { getUrlPath } from './utils/get-url-path.ts';
import { useSelector } from 'react-redux';
import { RootState } from './store/store.ts';

export default function Router(): ReactNode {
  const navigate = useNavigate();
  const { path } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if(path)
      navigate(path);
  }, [navigate, path])

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
          path: getUrlPath('dashboard'),
          element: <Dashboard />,
        },
        {
          path: getUrlPath('sales'),
          element: <Sales />,
        },
        {
          path: getUrlPath('clients'),
          element: <Clients />,
        },
        {
          path: getUrlPath('inventory'),
          element: <Inventory />,
        },
      ],
    },
    {
      path: '/login', // Ruta para el login
      element: <Login />,
    },
   
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const routesElement = useRoutes(routes);

  return routesElement;
}
