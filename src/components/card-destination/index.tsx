import { Destination } from '../../models/Destination'
import { Box, Button, Divider, Typography, useTheme } from '@mui/material'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import './CardDestination.css'

const CardDestination = (destination: Destination) => {
  const myTheme = useTheme()

  return (
    <Box
      className="card-destination"
      mt={{ xs: 3, sm: 0 }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <Box
        position={'absolute'}
        borderRadius={'5px'}
        border={'1px solid #fff'}
        px={1}
        left={15}
        top={0 - 20}
        width={{ xs: 'calc(100% - 30px)', sm: 'auto' }}
        minHeight={40}
        maxWidth={'calc(100% - 30px)'} // 15px a la izquierda y derecha
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ backgroundColor: myTheme.palette.background.paper, zIndex: 3 }}
      >
        <Typography variant="h5" textAlign="center">
          {destination.country}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography variant="h6" textAlign="center">
          {destination.city}
        </Typography>
      </Box>

      <Box className="read-more-icon-container">
        <ReadMoreIcon className="read-more-icon" fontSize="medium" />
      </Box>

      <Box
        overflow={'hidden'}
        borderRadius={'15px'}
        width={'100%'}
        height={'100%'}
        position={'relative'}
      >
        <img src={destination.image} alt="Imagen" className="image-container" />
        <Box className="description-container">
          <Typography variant="body1">{destination.description}</Typography>
          <Button variant="outlined" color="success" sx={{ mt: 4 }}>
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CardDestination
