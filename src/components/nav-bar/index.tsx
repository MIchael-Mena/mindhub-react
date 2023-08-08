import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import UserIcon from '@mui/icons-material/AccountCircle'
import './NavBar.css'
import { NavLink, useLocation } from 'react-router-dom'

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
    backgroundColor: myTheme.palette.primary.dark,
  }

  return (
    <AppBar component="nav" position="fixed">
      <Toolbar
        className="no-padding"
        sx={{
          display: 'flex',
          height: height,
          justifyContent: {
            sm: 'space-around',
            xs: 'space-between',
          },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 4, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className="logo"
          variant="h5"
          component="div"
          sx={{
            flexGrow: 0,
            display: { xs: 'none', sm: 'inline-flex' },
          }}
        >
          My Tinerary
        </Typography>
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
