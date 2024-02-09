import { Typography } from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';

export const CitiesCountDisplay = () => {
  const foundCitiesCount = useAppSelector(
    (store) => store.citiesReducer.citiesFiltered.params.totalCount
  );
  return (
    <>
      <Typography variant="body1" textTransform="none">
        {foundCitiesCount} cities found
      </Typography>
    </>
  );
};
