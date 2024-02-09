import { Button, CircularProgress } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { ApiResponse } from '../../../../models/ApiResponse';
import { User } from '../../../../models/User';
import { useApiService } from '../../../../hooks/useApiService';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import GoogleIcon from '@mui/icons-material/Google';

interface ButtonGoogleProps {
  onClose: () => void;
  dispatchGoogle: (code: string) => Promise<ApiResponse<User>>;
  buttonText: string;
}

export const ButtonGoogle = ({
  onClose,
  dispatchGoogle,
  buttonText,
}: ButtonGoogleProps) => {
  const [googleCode, setGoogleCode] = useState<string | null>(null);

  const { loading } = useApiService<ApiResponse<User>, void>(() => {
    return googleCode
      ? dispatchGoogle(googleCode).then((res) => handleGoogleAction(res))
      : Promise.resolve({} as ApiResponse<User>);
  }, [googleCode]);

  const handleGoogleAction = (apiRes: ApiResponse<User>) => {
    if (apiRes.success) {
      enqueueSnackbar(apiRes.message, {
        variant: 'success',
      });
      onClose();
    } else {
      enqueueSnackbar(
        Array.isArray(apiRes.message)
          ? apiRes.message.map((m) => m).join('.\n')
          : apiRes.message,
        {
          variant: 'error',
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
        onClick={() => signUp()}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mx: 1 }} />
            Loading...
          </>
        ) : (
          <>
            <GoogleIcon sx={{ mr: 1 }} />
            {buttonText}
          </>
        )}
      </Button>
    </>
  );
};
