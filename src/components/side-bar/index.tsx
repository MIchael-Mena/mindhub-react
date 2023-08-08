import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'

interface SideBarProps {
  navItems: string[]
  mobileOpen: boolean
  handleDrawerToggle: () => void
  width: string
  minWidth: string
}

export default function SideBar(props:SideBarProps) {
  const drawer = (
    <Box onClick={props.handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My Tinerary
      </Typography>
      <Divider />
      <List>
        {props.navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = () => document.body

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
  )
}