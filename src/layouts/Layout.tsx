import { Box } from '@mui/material';
import Header from '../components/header';
import Footer from '../components/footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layout = () => {
  const componentSizes = {
    header: '70px',
    main: 'calc(100vh - 140px)',
    footer: '70px',
  };

  return (
    <>
      <Header minHeight={componentSizes.header} />
      <Box
        component="main"
        sx={{
          position: 'relative',
          mt: 1,
          minHeight: componentSizes.main,
          display: 'flex',
        }}
      >
        <Outlet />
      </Box>
      <Footer minHeight={componentSizes.footer} />
      <ScrollRestoration
      // TODO: ver documentacion de react-router-dom
      // getKey={(key, location) => {
      //   console.log(key, location);
      //   return location[0].pathname;
      // }}
      />
    </>
  );
};

export default Layout;
