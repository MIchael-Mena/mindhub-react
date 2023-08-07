import { Container } from '@mui/material'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'

// interface LayoutProps {
//   children: ReactNode
// }

const Layout = () => {
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
          px: { xs: 0, sm: 5, md: 10 },
          mt: componentSizes.header,
          minHeight: componentSizes.main,
          maxWidth: 'lg',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
      <Footer height={componentSizes.footer} />
    </>
  )
}

export default Layout
