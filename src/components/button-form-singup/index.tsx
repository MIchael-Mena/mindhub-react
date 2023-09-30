import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { User } from '../../models/User';
import { register } from '../../store/actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { useApiService } from '../../hooks/useApiService';
import { Button, CircularProgress } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

interface ButtonFormSingupProps {
  onClose: () => void;
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
  payloadOfSubmit: { form: User } | null;
}

export const ButtonFormSingup = ({
  payloadOfSubmit: payload,
  onClose,
  dispatch,
}: ButtonFormSingupProps) => {
  const { loading } = useApiService<ApiResponse<User>>(
    () => {
      return payload
        ? dispatch(register(payload.form)).then((res) => {
            return handleRegister(res.payload as ApiResponse<User>);
          })
        : Promise.resolve({} as ApiResponse<User>);
    },
    [payload],
    true
  );

  const handleRegister = (resPayload: ApiResponse<User>) => {
    if (resPayload.success) {
      enqueueSnackbar('User created successfully!', {
        variant: 'success',
        // anchorOrigin: { vertical: 'top', horizontal: 'center' }, Esta puesto en el config de forma global
      });
      onClose();
    } else {
      enqueueSnackbar(
        Array.isArray(resPayload.message)
          ? resPayload.message.map((m) => m).join('.\n')
          : resPayload.message,
        {
          variant: 'error',
        }
      );
    }
    return resPayload;
  };

  return (
    <>
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
          'Sing up'
        )}
      </Button>
    </>
  );
};
