import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import UserIcon from '@mui/icons-material/AccountCircle'
import './NavBar.css'
import { Link as Anchor } from 'react-router-dom'

interface NavBarProps {
  navItems: string[]
  handleDrawerToggle: () => void
  height: string
}

const NavBar = ({ navItems, handleDrawerToggle, height }: NavBarProps) => {
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
            <Anchor to={`/${item}`} key={key}>
              <Button>{item}</Button>
            </Anchor>
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
