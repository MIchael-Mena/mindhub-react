import { Box, Grid, Link, Paper } from '@mui/material'
import SocialLinks from '../social-links'
import ColumItems from '../colum-items'
import containerBreakpoints from '../../layouts/container-breakpoints'
import { Email, Home, Phone, Print } from '@mui/icons-material'

export default function Footer({ height }: { height: string }) {
  const columns = [
    {
      title: 'Products',
      links: [
        { label: 'City Tours', url: '#' },
        { label: 'Adventure Packages', url: '#' },
        { label: 'Cultural Experiences', url: '#' },
        { label: 'Beach Getaways', url: '#' },
      ],
    },
    {
      title: 'Useful links',
      links: [
        { label: 'Pricing', url: '#' },
        { label: 'Settings', url: '#' },
        { label: 'Orders', url: '#' },
        { label: 'Help', url: '#' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: 'New York, NY 10012, US', icon: <Home /> },
        { label: 'info@example.com', icon: <Email /> },
        { label: '+ 01 234 567 88', icon: <Phone /> },
        { label: '+ 01 234 567 89', icon: <Print /> },
      ],
      // links: [
      //   { label: 'New York, NY 10012, US', icon: 'faHome' },
      //   { label: 'info@example.com', icon: 'faEnvelope' },
      //   { label: '+ 01 234 567 88', icon: 'faPhone' },
      //   { label: '+ 01 234 567 89', icon: 'faPrint' },
      // ],
    },
  ]

  return (
    <>
      <Paper component="footer">
        {/* Social Media Section */}
        <Box
          position="relative"
          sx={{
            display: 'flex',
            minHeight: height,
            justifyContent: { xs: 'center', md: 'space-evenly' },
            alignItems: 'center',
            borderBottom: '1px solid',
          }}
        >
          {/* Left */}
          <Box
            sx={{ me: { xs: 0, lg: 5 } }}
            display={{ xs: 'none', md: 'block' }}
          >
            <span>Get connected with us on social networks:</span>
          </Box>
          {/* Left */}

          {/* Right */}
          <SocialLinks />
          {/* Right */}
        </Box>
        {/* Social Media Section */}

        <Grid
          mt={3}
          container
          spacing={1}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          textAlign={{ xs: 'center', md: 'start' }}
          mx={'auto'}
          sx={{ ...containerBreakpoints }}
        >
          {columns.map((column, index) => (
            <Grid item xs={12} sm={6} md={3} mb={4} key={index}>
              <ColumItems title={column.title} links={column.links} />
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }}
        >
          © 2023 Copyright:{' '}
          <Link href="#" color="inherit" fontWeight="bold">
            MyTinerary
          </Link>
        </Box>
        {/* Copyright */}
      </Paper>
    </>
  )
}
