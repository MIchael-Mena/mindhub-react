import './App.css'
import Layout from './layouts/Layout'
import React from 'react'

import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cities from './pages/Cities'

const router = createBrowserRouter([
  // { path: '/', action: () => import('../pages/Home') },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/Home', element: <Home /> },
      { path: '/Cities', element: <Cities /> },
    ],
  },
  { path: '*', element: <h1>404</h1> },
])

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  )
}

export default App
