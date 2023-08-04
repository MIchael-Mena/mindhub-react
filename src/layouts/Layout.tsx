import { ReactNode } from 'react'
import { Container } from '@mui/material'
import Header from '../components/header'
import Footer from '../components/footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const componentSizes = {
    header: '70px',
    main: 'calc(100vh - 140px)',
    footer: '70px',
  }

  return (
    <>
      <Header height={componentSizes.header} />
      <Container
        component="main"
        sx={{
          position: 'relative',
          px: { xs: 2, sm: 5 },
          mt: componentSizes.header,
          minHeight: componentSizes.main,
          maxWidth: 'lg',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
      <Footer height={componentSizes.footer} />
    </>
  )
}

export default Layout
