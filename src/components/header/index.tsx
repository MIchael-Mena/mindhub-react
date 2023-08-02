import { useState } from 'react'
import Box from '@mui/material/Box' // Importa el componente Box de Material UI
import NavBar from '../nav-bar'
import SideBar from '../side-bar'

interface HeaderProps {
  height: string
}

const Header = ({ height }: HeaderProps) => {
  const navItems: string[] = ['Home', 'Cities']
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  return (
    <>
      <Box component="header">
        <NavBar
          navItems={navItems}
          handleDrawerToggle={handleDrawerToggle}
          height={height}
        />
        <SideBar
          navItems={navItems}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          width="70%"
          minWidth="240px"
        />
      </Box>
    </>
  )
}

export default Header
