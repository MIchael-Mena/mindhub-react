import { Button, CircularProgress } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { registerFromGoogle } from '../../store/actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { User } from '../../models/User';
import { RootState } from '../../store/store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useApiService } from '../../hooks/useApiService';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import GoogleIcon from '@mui/icons-material/Google';

interface ButtonGoogleSingupProps {
  onClose: () => void;
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
}

export const ButtonGoogleSingup = ({
  onClose,
  dispatch,
}: ButtonGoogleSingupProps) => {
  const [googleCode, setGoogleCode] = useState<string | null>(null);

  const { loading } = useApiService<ApiResponse<User>>(() => {
    return googleCode
      ? dispatch(registerFromGoogle({ code: googleCode })).then((res) =>
          handleGoogleSingUp(res.payload as ApiResponse<User>)
        )
      : Promise.resolve({} as ApiResponse<User>);
  }, [googleCode]);

  const handleGoogleSingUp = (apiRes: ApiResponse<User>) => {
    if (apiRes.success) {
      enqueueSnackbar('User created successfully!', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
      onClose();
    } else {
      enqueueSnackbar(
        Array.isArray(apiRes.message)
          ? apiRes.message.map((m) => m).join('\n')
          : apiRes.message,
        {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        }
      );
    }
    return apiRes;
  };

  const signUp = useGoogleLogin({
    flow: 'auth-code', // auth-code or implicit
    // prompt: 'select_account', // none, consent, select_account
    onSuccess: (response) => {
      setGoogleCode(response.code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => loading || signUp()}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mx: 1 }} />
            Loading...
          </>
        ) : (
          <>
            <GoogleIcon sx={{ mr: 1 }} />
            Sign up with Google
          </>
        )}
      </Button>
    </>
  );
};
