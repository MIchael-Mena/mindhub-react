import { Pagination, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';

export const PaginationControls = () => {
  // TODO: no se usa useNavigate ya que navega a la misma pagina y genera un renderizado en todos los componentes
  // a diferencia de useSearchParams que no genera renderizados extras (solamente a los que estan suscritos)
  // const navigate = useNavigate();
  const totalPages = useAppSelector(
    // Redux me asegura que el store no va a cambiar mientras se esta renderizando
    // y no va a ver renders extras si otra propiedad distinta a la que se esta usando cambia
    (store) => store.citiesReducer.citiesFiltered.params.totalPages
  );
  const [searchParam, setSearchParams] = useSearchParams();
  const searchParamRaw = searchParam.get('page');
  const currentPage = Number(searchParamRaw) || 1; // Si se pasa un 0, '0' o null a Number sera false

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      (params: URLSearchParams) => {
        params.set('page', newPage.toString());
        return params;
      },
      { preventScrollReset: true }
    );
  };

  // Use effect para controlar que el valor de page sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    if (isNaN(Number(searchParamRaw))) {
      // Si no se puede convertir a un numero da true (ej 'a'), (da false si searchParam es null o un numero ej '1' o 1)
      setSearchParams(
        (params: URLSearchParams) => {
          params.delete('page');
          return params;
        },
        { preventScrollReset: true }
      );
    }
  }, [searchParamRaw]);

  return (
    <>
      {totalPages > 1 && (
        <Stack spacing={4}>
          <Pagination
            count={totalPages || 0}
            shape="rounded"
            variant="outlined"
            color="primary"
            defaultPage={1}
            page={currentPage}
            onChange={(_event, page) => handlePageChange(page)}
          />
        </Stack>
      )}
    </>
  );
};
