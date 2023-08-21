import { Box } from '@mui/material';
import { useApiService } from '../../hooks/useApiService';
import { ApiService } from '../../services/api.service';
import CardCity from '../card-city';
import { City } from '../../models/City';

export const CitiesList = () => {
  const { data: cities, loading } = useApiService<City[]>(() =>
    ApiService.getData('/cities')
  );
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          marginTop: 4,
        }}
      >
        {cities.map((city, index) => (
          <CardCity key={index} city={city} />
        ))}
      </Box>
    </>
  );
};
