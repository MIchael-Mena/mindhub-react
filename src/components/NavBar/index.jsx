import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import UserIcon from '@mui/icons-material/AccountCircle'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from '@mui/material'

export default function NavBar({ navItems, handleDrawerToggle, height }) {
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
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            display: { xs: 'none', sm: 'inline-flex' },
          }}
        >
          My Tinerary
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
          {navItems.map((item) => (
            <Button
              key={item}
              sx={{
                color: '#fff',
                textTransform: 'capitalize',
              }}
            >
              {item}
            </Button>
          ))}
          <Button
            variant="contained"
            sx={{ textTransform: 'capitalize' }}
            color="secondary"
          >
            <UserIcon sx={{ mr: 1 }} />
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
