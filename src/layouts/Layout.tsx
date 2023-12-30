import { Box } from '@mui/material';
import Header from '../modules/core/components/header';
import Footer from '../modules/core/components/footer';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { useEffect } from 'react';
import { authenticate } from '../store/actions/user';

const Layout = () => {
  const componentSizes = {
    header: '70px',
    main: 'calc(100vh - 140px)',
    footer: '70px',
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
      dispatch(authenticate(token)).then((res) => {
        // Si es undefined, falló la autenticación (token expirado, etc.)
        if (res.payload === 'Unauthorized') navigate('/home');
      });
  }, []);

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
