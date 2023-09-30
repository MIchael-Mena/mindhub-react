// import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { ApiResponse } from '../../models/ApiResponse';
import { User } from '../../models/User';
import { enqueueSnackbar } from 'notistack';
import { Button, CircularProgress } from '@mui/material';
import { LoginForm } from '../../models/LoginForm';
import { useApiService } from '../../hooks/useApiService';

interface ButtonFormProps {
  // dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
  onSubmit: (form: LoginForm) => Promise<ApiResponse<User>>;
  payloadOfSubmit: { form: LoginForm } | null;
  onClose: () => void;
  buttonText: string;
}

export const ButtonForm = ({
  onSubmit,
  onClose,
  buttonText,
  payloadOfSubmit: payload,
}: ButtonFormProps) => {
  const { loading } = useApiService<ApiResponse<User>>(
    () =>
      payload
        ? onSubmit(payload.form).then((res) => handleAction(res))
        : Promise.resolve({} as ApiResponse<User>),
    [payload],
    true
  );

  const handleAction = (res: ApiResponse<User>) => {
    if (res.success) {
      enqueueSnackbar(res.message, {
        variant: 'success',
        // anchorOrigin: { vertical: 'top', horizontal: 'center' }, Esta puesto en el config de forma global
      });
      onClose();
    } else {
      enqueueSnackbar(
        Array.isArray(res.message)
          ? res.message.map((m) => m).join('.\n')
          : res.message,
        {
          variant: 'error',
        }
      );
    }
    return res;
  };

  return (
    <Button
      type="submit"
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
