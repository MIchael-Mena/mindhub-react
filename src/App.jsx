import React from 'react'
import { CssBaseline } from '@mui/material'
import './App.css'

import Home from './pages/Home'
import Layout from './layouts/Layout'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout>
        <Home />
      </Layout>
    </React.Fragment>
  )
}

export default App
