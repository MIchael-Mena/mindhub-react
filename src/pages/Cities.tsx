import { Box, Container, Divider, Typography } from '@mui/material'
import Finder from '../components/finder'
import CardCity from '../components/card-city'
import { destinations } from '../services/Destinations'

const Cities = () => {
  const backgroundImage = 'src/assets/images/cities-bg-altg.png'

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
        <Box
          component="section"
          sx={{
            position: 'relative',
            width: '100%',
            // height: '0', // Inicialmente, alto 0 para mostrar la imagen completa
            paddingBottom: '74%', // Ratio de aspecto de la imagen (4:3)
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <img
            src={backgroundImage}
            alt="Background"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'rgb(55, 48, 107, 0.8)',
              p: 2,
              borderRadius: 15,
              textAlign: 'center',
              width: '80%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant="h1">Cities</Typography>
            <Typography variant="h5" color="success.main">
              Collection of the most beautiful places and experiences in the
              world to visit and enjoy.
            </Typography>
          </Box>
        </Box>

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
