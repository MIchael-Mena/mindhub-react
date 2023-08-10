import { Box, Grid, Link, Paper } from '@mui/material'
import SocialLinks from '../social-links'
import ColumItems from '../colum-items'
import containerBreakpoints from '../../layouts/container-breakpoints'

export default function Footer({ height }: { height: string }) {
  const socialLinks = [
    //  { icon: faFacebookF, url: '#' },
    //  { icon: faTwitter, url: '#' },
    //  { icon: faGoogle, url: '#' },
    //  { icon: faInstagram, url: '#' },
    //  { icon: faLinkedin, url: '#' },
    //  { icon: faGithub, url: '#' },
  ]

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
        { label: 'New York, NY 10012, US', icon: 'faHome' },
        { label: 'info@example.com', icon: 'faEnvelope' },
        { label: '+ 01 234 567 88', icon: 'faPhone' },
        { label: '+ 01 234 567 89', icon: 'faPrint' },
      ],
    },
  ]

  return (
    <>
      <Paper
        component="footer"
        sx={
          {
            // width: '100%',
            // display: 'flex',
            // flexDirection: 'column',
            // // justifyContent: 'center',
            // alignItems: 'center',
          }
        }
      >
        {/* Social Media Section */}
        <Box
          position="relative"
          sx={{
            display: 'flex',
            minHeight: height,
            justifyContent: { xs: 'center', lg: 'between' },
            alignItems: 'center',
            borderBottom: '1px solid',
          }}
        >
          {/* Left */}
          <Box
            sx={{ me: { xs: 0, lg: 5 } }}
            display={{ xs: 'none', lg: 'block' }}
          >
            <span>Get connected with us on social networks:</span>
          </Box>
          {/* Left */}

          {/* Right */}
          <SocialLinks />
          {/* Right */}
        </Box>
        {/* Social Media Section */}

        {/* <Container sx={{ textAlign: { xs: 'center', md: 'start' } }}> */}
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
            <Grid
              item
              xs={12}
              md={3}
              lg={column.title === 'Contact' ? 4 : 2}
              xl={3}
              mb={4}
              key={index}
            >
              <ColumItems title={column.title} links={column.links} />
            </Grid>
          ))}
        </Grid>
        {/* </Container> */}

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
