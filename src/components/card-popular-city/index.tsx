import { City } from '../../models/City';
import { Box, Button, Divider, Typography } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link as Anchor } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { updateCitySelected } from '../../store/actions/cities';
import './CardPopularCity.css';

const CardPopularCity = (city: City) => {
  const dispatch = useAppDispatch();
  const pathCityDetail = `/city-detail/${city['_id']}`;
  const currentPath = window.location.pathname;

  return (
    <Box className="card-destination">
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
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          zIndex: 3,
        }}
      >
        <Typography variant="h5" textAlign="center">
          {city.country}
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography variant="h6" textAlign="center">
          {city.name}
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
        <img src={city.images[0]} alt="Imagen" className="image-container" />
        <Box className="description-container" p={{ xs: 2, sm: 4 }}>
          <Typography variant="body1">{city.description}</Typography>
          <Anchor
            to={pathCityDetail}
            state={{ from: currentPath }}
            onClick={() => dispatch(updateCitySelected(city))}
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
