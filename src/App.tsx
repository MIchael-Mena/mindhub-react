import './App.css'
import Layout from './layouts/Layout'
import React from 'react'
import Home from './pages/Home'

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Home />
      </Layout>
    </React.Fragment>
  )
}

export default App
