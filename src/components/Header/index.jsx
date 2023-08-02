import React from 'react'
import { useState } from 'react'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import { Box } from '@mui/material'

export default function Header({ height }) {
  const navItems = ['Home', 'Cities']
  const [mobileOpen, setMobileOpen] = useState(false)

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
