import { ROUTES } from './constants/routes';
import { Table } from './pages/Table';
import { UserPage } from './pages/UserPage';
import { useRoutes } from 'react-router-dom';

export const MyRoutes = () => {
    let routes = useRoutes([
      { path: ROUTES.table, element: <Table /> },
      { path: ROUTES.user, element: <UserPage /> },
    ]);
    return routes;
};
