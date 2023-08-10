import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import Cities from '../pages/Cities'

const router = createBrowserRouter([
  // { path: '/', action: () => import('../pages/Home') }, Lazy loading
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="/Home" /> },
      { path: '/Home', element: <Home /> },
      { path: '/Cities', element: <Cities /> },
    ],
  },
  { path: '*', element: <h1>404</h1> },
])

export default router
