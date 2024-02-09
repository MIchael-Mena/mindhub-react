import { Navigate, createBrowserRouter } from 'react-router-dom';
import { NavItem } from '../models/NavItem';
import Layout from '../layouts/Layout';
import Home from '../modules/home/pages/Home';
import Cities from '../modules/cities/pages/Cities';
import CityDetail from '../modules/cityDetail/pages/CityDetail';
import NotFound from '../modules/core/components/not-found';

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
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export { router, navItems };
