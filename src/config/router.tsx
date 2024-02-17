import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import NotFound from '../modules/core/components/not-found';
import { NavItem } from '../models/NavItem';
import LoaderTransition from '../modules/core/components/loader-transition';

const Home = React.lazy(() => import('../modules/home/pages/Home'));
const Cities = React.lazy(() => import('../modules/cities/pages/Cities'));
const CityDetail = React.lazy(
  () => import('../modules/cityDetail/pages/CityDetail')
);

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
      {
        path: '/home',
        element: (
          <Suspense fallback={<LoaderTransition />}>
            <Home />
          </Suspense>
        ),
        caseSensitive: true,
      },
      {
        path: '/cities',
        element: (
          <Suspense fallback={<LoaderTransition />}>
            <Cities />
          </Suspense>
        ),
        caseSensitive: true,
      },
      {
        path: '/city-detail/:id',
        element: (
          <Suspense fallback={<LoaderTransition />}>
            <CityDetail />
          </Suspense>
        ),
        caseSensitive: true,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export { router, navItems };
