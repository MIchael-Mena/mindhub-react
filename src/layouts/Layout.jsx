import { Container } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import React from 'react'

function Layout({ children }) {
  const componetSizes = {
    header: '70px',
    main: 'calc(100vh - 140px)',
    footer: '70px',
  }
  return (
    <>
      <Header height={componetSizes.header} />
      <Container
        component="main"
        sx={{
          position: 'relative',
          px: { xs: 2, sm: 5 },
          mt: componetSizes.header,
          minHeight: componetSizes.main,
          maxWidth: 'lg',
          display: 'flex',
        }}
      >
        {children}
      </Container>
      <Footer height={componetSizes.footer} />
    </>
  )
}

export default Layout
