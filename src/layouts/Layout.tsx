import { Container } from '@mui/material'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'
import useStyles from '../shared/use-styles'

// interface LayoutProps {
//   children: ReactNode
// }

const Layout = () => {
  const myStyles = useStyles()
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
          mt: componentSizes.header,
          minHeight: componentSizes.main,
          display: 'flex',
          flexDirection: 'column',
          ...myStyles.containerBreakpoints,
        }}
      >
        <Outlet />
      </Container>
      <Footer height={componentSizes.footer} />
    </>
  )
}

export default Layout
