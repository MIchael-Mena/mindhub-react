import { Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCities } from '../../../../store/actions/cities';

export const PaginationControls = () => {
  // TODO: no se usa useNavigate ya que navega a la misma pagina y genera un renderizado en todos los componentes
  // const navigate = useNavigate();
  const totalPages = useAppSelector(
    // Redux me asegura que el store no va a cambiar mientras se esta renderizando
    // y no va a ver renders extras si otra propiedad distinta a la que se esta usando cambia
    (store) => store.citiesReducer.citiesFiltered.totalPages
  );
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function handlePageChange(newPage: number) {
    setSearchParams({ page: newPage.toString() }, { preventScrollReset: true });
    dispatch(fetchCities({ page: newPage }));
  }

  return (
    <Stack spacing={4} mt={3}>
      <Pagination
        count={totalPages}
        shape="rounded"
        variant="outlined"
        color="primary"
        defaultPage={1}
        page={currentPage}
        onChange={(_event, page) => handlePageChange(page)}
      />
    </Stack>
  );
};
