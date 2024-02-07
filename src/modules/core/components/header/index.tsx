import { useState } from 'react';
import Box from '@mui/material/Box'; // Importa el componente Box de Material UI
import NavBar from '../nav-bar';
import { SideBar } from '../side-bar';

interface HeaderProps {
  minHeight: string;
}

const Header = ({ minHeight }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box component="header">
        <NavBar handleDrawerToggle={handleDrawerToggle} minHeight={minHeight} />
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          width="70%"
          minWidth="240px"
        />
      </Box>
    </>
  );
};

export default Header;
