import { City } from '../../models/City';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link as Anchor } from 'react-router-dom';
import './CardPopularCity.css';

const CardPopularCity = (destination: City) => {
  const myTheme = useTheme();

  return (
    <Box className="card-destination" mt={{ xs: 3, sm: 0 }}>
      <Box
        position={'absolute'}
        borderRadius={'5px'}
        border={'1px solid #fff'}
        px={1}
        left={15}
        top={0 - 20}
        width={{ xs: 'calc(100% - 30px)', sm: 'auto' }}
        minHeight={40}
        maxWidth={'calc(100% - 30px)'} // 15px a la izquierda y derecha el bordeRadius
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
          {destination.name}
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
        <img
          src={destination.images[0]}
          alt="Imagen"
          className="image-container"
        />
        <Box className="description-container" p={{ xs: 2, sm: 4 }}>
          <Typography variant="body1">{destination.description}</Typography>
          <Anchor
            to={`/CityDetail/${destination['_id']}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Button
              variant="outlined"
              color="success"
              sx={{ mt: { xs: 2, sm: 4 } }}
            >
              Explore
            </Button>
          </Anchor>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPopularCity;
