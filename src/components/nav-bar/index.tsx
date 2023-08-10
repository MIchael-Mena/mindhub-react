import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import UserIcon from '@mui/icons-material/AccountCircle'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../logo'
import './NavBar.css'

interface NavBarProps {
  navItems: string[]
  handleDrawerToggle: () => void
  height: string
}

const NavBar = ({ navItems, handleDrawerToggle, height }: NavBarProps) => {
  const myTheme = useTheme()
  const pathName = useLocation().pathname
  const isActiveItem = (item: string) => pathName === `/${item}`
  const activeButtonStyle = {
    color: myTheme.palette.primary.main,
  }

  return (
    <AppBar component="nav" position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          height: height,
          justifyContent: {
            sm: 'space-around',
            xs: 'space-between',
          },
          px: { sm: '0', xs: '2' },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Logo isVisibleInXs={false} />

        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            {navItems.map((item, key) => (
              <NavLink
                to={`/${item}`}
                key={key}
                // className={(navData) =>
                //   navData.isActive ? 'active-nav-link' : 'none'
                // }
              >
                <Button
                  className={`hover-effect-nav-link ${
                    isActiveItem(item) ? 'active-nav-link' : ''
                  }`}
                  sx={isActiveItem(item) ? activeButtonStyle : {}}
                >
                  {item}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
            <UserIcon sx={{ mr: 1 }} />
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
