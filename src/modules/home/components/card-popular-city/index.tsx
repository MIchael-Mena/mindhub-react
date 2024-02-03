import { CityBasic } from '../../../../models/CityBasic';
import { Box, Button, Divider, Typography } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link as Anchor } from 'react-router-dom';
import './CardPopularCity.css';

const CardPopularCity = (city: CityBasic) => {
  const pathCityDetail = `/city-detail/${city['_id']}`;
  const currentPath = window.location.pathname; // No se usa, pero queda como ejemplo de state de Anchor

  return (
    <Box className="card-popular-city">
      <Box
        className="title-container"
        width={{ xs: 'calc(100% - 30px)', sm: 'auto' }}
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
        overflow="hidden"
        borderRadius="15px"
        width="100%"
        height="100%"
        position="relative"
      >
        <img
          src={city.images[0]}
          alt="Imagen"
          className="image-container"
          // loading="lazy"
        />
        <Box className="description-container" p={{ xs: 2, sm: 4 }}>
          <Typography variant="body1">{city.description}</Typography>
          <Anchor to={pathCityDetail} state={{ from: currentPath }}>
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
