import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import Logo from '../logo';
import { Link as Anchor, useLocation } from 'react-router-dom';
import useStyles from '../../hooks/useStyles';

interface SideBarProps {
  navItems: string[];
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  width: string;
  minWidth: string;
}

export default function SideBar(props: SideBarProps) {
  const myStyles = useStyles();
  const pathName = useLocation().pathname;
  const isActiveItem = (item: string) => pathName === `/${item}`;

  const drawer = (
    <Box onClick={props.handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Logo isVisibleInSm={false} sizeXs="small" />
      <Divider />
      <List>
        {props.navItems.map((item) => (
          <Anchor key={item} to={`/${item}`}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText
                  primary={item}
                  aria-label={item}
                  sx={isActiveItem(item) ? myStyles.navLinkActive : {}}
                />
              </ListItemButton>
            </ListItem>
          </Anchor>
        ))}
      </List>
    </Box>
  );

  const container = () => document.body;

  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.width,
            minWidth: props.minWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
