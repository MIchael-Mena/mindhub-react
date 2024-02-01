import { ApiResponse } from '../../../../models/ApiResponse';
import { User } from '../../../../models/User';
import { enqueueSnackbar } from 'notistack';
import { Button, CircularProgress } from '@mui/material';
import { useApiService } from '../../../../hooks/useApiService';

interface ButtonFormProps<T> {
  onSubmit: (form: T) => Promise<ApiResponse<User>>;
  payloadOfSubmit: { form: T } | null;
  onClose: () => void;
  buttonText: string;
}

export const ButtonForm = <T extends Object>({
  onSubmit,
  onClose,
  buttonText,
  payloadOfSubmit: payload,
}: ButtonFormProps<T>) => {
  const { loading } = useApiService<ApiResponse<void>, void>(
    () =>
      payload
        ? handleActionDispatch()
        : Promise.resolve({} as ApiResponse<void>),
    [payload],
    true
  );

  const handleSnackbar = (
    message: string | string[],
    variant: 'success' | 'error'
  ) => {
    enqueueSnackbar(Array.isArray(message) ? message.join('.\n') : message, {
      variant,
    });
    // anchorOrigin: { vertical: 'top', horizontal: 'center' }, Esta puesto en el config de forma global
  };

  const handleActionDispatch = async () => {
    await onSubmit(payload!.form)
      .then((res) => {
        handleSnackbar(res.message, 'success');
        onClose();
      })
      .catch((res: ApiResponse<User>) => {
        handleSnackbar(res.message, 'error');
      });
    return Promise.resolve({} as ApiResponse<void>);
  };

  return (
    <Button
      type="submit" // Al hacer click en el boton se ejecuta el onSubmit del form
      variant="contained"
      color="primary"
      disabled={loading}
    >
      {loading ? (
        <>
          <CircularProgress size={20} sx={{ mx: 1 }} />
          ...Loading
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};
