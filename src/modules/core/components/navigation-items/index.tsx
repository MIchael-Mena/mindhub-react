import { NavLink, useLocation } from 'react-router-dom';
import useStyles from '../../../../hooks/useStyles';
import { Box, Button } from '@mui/material';
import { navItems } from '../../../../config/router';
import './NavigationItems.css';

interface NavigationItemsProp {}

export const NavigationItems = ({}: NavigationItemsProp) => {
  const myStyles = useStyles();
  const currentPathName = useLocation().pathname; // Cada vez que cambia la ruta, vuelve a renderizar el componente
  const isActiveItem = (path: string) => currentPathName === path;

  return (
    <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
      {navItems.map((item, key) => (
        <NavLink
          to={item.path}
          key={key}
          // state={{ from: window.location.pathname }}
          // preventScrollReset={true}
        >
          <Button
            className={`hover-effect-nav-link ${
              isActiveItem(item.path) ? 'active-nav-link' : ''
            }`}
            sx={isActiveItem(item.path) ? myStyles.navLinkActive : {}}
          >
            {item.name}
          </Button>
        </NavLink>
      ))}
    </Box>
  );
};
