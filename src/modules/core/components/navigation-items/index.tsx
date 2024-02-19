import { useLocation, useNavigate } from 'react-router-dom';
import useStyles from '../../../../hooks/useStyles';
import { Box, Button } from '@mui/material';
import { navItems } from '../../../../config/router';
import './navigation-items.css';

interface NavigationState {
  previousPath: string;
  previousParams: string;
}

interface NavigationItemsProp {}

export const NavigationItems = ({}: NavigationItemsProp) => {
  const myStyles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPathName = location.pathname;

  const isActiveItem = (path: string) => currentPathName === path;

  const handleNavigation = (path: string) => {
    const queryParams = new URLSearchParams(location.search);
    const previousState: NavigationState = location.state;
    const pathWithParams =
      previousState?.previousPath !== path && previousState?.previousParams
        ? `${path}?${previousState?.previousParams}`
        : path;

    navigate(pathWithParams, {
      state: {
        previousParams: queryParams.toString(),
        previousPath: path,
      },
      preventScrollReset: true,
    });
  };

  return (
    <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
      {navItems.map((item, key) => (
        <Button
          key={key}
          onClick={() => handleNavigation(item.path)}
          className={`hover-effect-nav-link ${
            isActiveItem(item.path) ? 'active-nav-link' : ''
          }`}
          sx={isActiveItem(item.path) ? myStyles.navLinkActive : {}}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
};
