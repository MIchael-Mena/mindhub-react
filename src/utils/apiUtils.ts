import { AxiosError } from 'axios';
import { ApiResponse } from '../models/ApiResponse';
import { enqueueSnackbar } from 'notistack';

const getApiError = <T = void>(err: any) => {
  const error: AxiosError<ApiResponse<T>> = err;
  const apiRes =
    error.response && error.response.data
      ? error.response.data
      : ({
          success: false,
          message: 'An error has occurred while processing your request', // mensaje generico, cada accion podria tener su propio mensaje
        } as ApiResponse<T>);
  return apiRes;
};

// Usar dentro de un componente, aunque tambien se puede usar en un reducer
const handleSnackbar = (
  message: string | string[],
  variant: 'success' | 'error' | 'warning' | 'info' | 'default' = 'error'
) => {
  enqueueSnackbar(Array.isArray(message) ? message.join('.\n') : message, {
    variant,
  });
  // anchorOrigin: { vertical: 'top', horizontal: 'center' }, Esta puesto en el config de forma global
};

export { getApiError, handleSnackbar };
