import { Box } from '@mui/material'
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
      <Box
        component="main"
        sx={{
          position: 'relative',
          mt: componentSizes.header,
          minHeight: componentSizes.main,
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>
      <Footer minHeight={componentSizes.footer} />
    </>
  )
}

export default Layout
