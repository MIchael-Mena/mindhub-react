import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../modules/home/pages/Home';
import Cities from '../modules/cities/pages/Cities';
import CityDetail from '../modules/cityDetail/pages/CityDetail';
import { NavItem } from '../models/NavItem';

const navItems: NavItem[] = [
  { name: 'Home', path: '/home' },
  { name: 'Cities', path: '/cities' },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="/home" /> },
      { path: '/home', element: <Home />, caseSensitive: true },
      { path: '/cities', element: <Cities />, caseSensitive: true },
      {
        path: '/city-detail/:id',
        element: <CityDetail />,
        caseSensitive: true,
      },
    ],
  },
  { path: '*', element: <h1>404</h1> },
]);

export { router, navItems };
