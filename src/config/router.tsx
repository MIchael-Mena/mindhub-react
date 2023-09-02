import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Cities from '../pages/Cities';
import CityDetail from '../pages/CityDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="/home" /> },
      { path: '/home', element: <Home /> },
      { path: '/cities', element: <Cities /> },
      { path: '/city-detail/:id', element: <CityDetail /> },
    ],
  },
  { path: '*', element: <h1>404</h1> },
]);

export default router;
