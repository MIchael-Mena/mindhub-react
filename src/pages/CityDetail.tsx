import { useParams } from 'react-router-dom';
import { useApiService } from '../hooks/useApiService';
import { ApiService } from '../services/api.service';
import { City } from '../models/City';
import { CircularProgress } from '@mui/material';

const CityDetail = () => {
  const { id } = useParams();
  const { data: city, loading } = useApiService<City>(() =>
    ApiService.getData(`/city/${id}`)
  );

  return (
    <>
      <h1>City</h1>
      <p>City id: {id}</p>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <div>
          <p>{city?.name}</p>
        </div>
      )}
    </>
  );
};

export default CityDetail;
