import './App.css'
import Layout from './layouts/Layout'
import { CssBaseline } from '@mui/material'
import React from 'react'
import Home from './pages/Home'

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
