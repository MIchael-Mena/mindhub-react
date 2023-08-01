import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import UserIcon from '@mui/icons-material/AccountCircle';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Grid,
  Container
} from '@mui/material';
import './App.css';

const imageURL = 'src/assets/no-img-up.png';
const navItems = ['Home', 'Cities'];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My Tinerary
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = () => document.body;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar component="nav" position='fixed'>
        <Toolbar className='np' sx={{display: 'flex', justifyContent: {sm:'space-around', xs: 'space-between'}}}>
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
            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            My Tinerary
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', textTransform: 'capitalize'}} >
                {item}
              </Button>
            ))}
            <Button variant="contained" sx={{textTransform: 'capitalize'}} color='secondary'>
              <UserIcon sx={{mr: 1}} />
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejora el rendimiento de apertura en dispositivos móviles.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '70%', minWidth: '240px'},
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container component="main" sx={{ px: { xs: 2, sm: 5 }, maxWidth: 'lg', width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
              Find the perfect destination
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              Our app will help you find the perfect path for your next trip. With an easy-to-use
              interface and a host of itinerary options, planning your next trip has never been easier.
            </Typography>
            <Button variant="contained" sx={{ textTransform: 'capitalize' }} color="secondary">
              View More
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imageURL} alt="no-img" className='main-img' />
          </Grid>
        </Grid>
      </Container>
      {/* <Box component="main" sx={{ px: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
              Find the perfect destination
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              Our app will help you find the perfect path for your next trip. With an easy-to-use
              interface and a host of itinerary options, planning your next trip has never been easier.
            </Typography>
            <Button variant="contained" sx={{ textTransform: 'capitalize' }} color="secondary">
              View More
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imageURL} alt="no-img" className='main-img' />
          </Grid>
        </Grid>
      </Box> */}
    </React.Fragment>
  );
}


export default App;