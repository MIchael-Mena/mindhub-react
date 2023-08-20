import { Box, Container, Divider, Typography } from '@mui/material'
import Finder from '../components/finder'
import CardCity from '../components/card-city'
import { destinations } from '../services/destinations'
import Hero from '../components/hero'

const Cities = () => {
  const heroImage = 'src/assets/images/city-bg.png'

  return (
    <>
      <Container
        disableGutters
        maxWidth={'lg'}
        sx={{
          alignSelf: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pb: 3,
        }}
      >
        <Hero imageHero={heroImage} sizeImage="74%">
          <Typography variant="h1">Cities</Typography>
          <Typography variant="h5" color="success.main">
            Collection of the most beautiful places and experiences in the world
            to visit and enjoy.
          </Typography>
        </Hero>

        <Divider sx={{ width: '100%', mt: 3, mb: 3 }} />

        <Finder />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 3,
            marginTop: 4,
          }}
        >
          {destinations.map((city, index) => (
            <CardCity key={index} city={city} />
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Cities
