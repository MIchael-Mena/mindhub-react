import { Button } from '@mui/material';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { registerFromGoogle } from '../../store/actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { User } from '../../models/User';
// import { useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { AnyAction, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useApiService } from '../../hooks/useApiService';
import { useState } from 'react';

interface ButtonGoogleSingupProps {
  onClose: () => void;
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
}

export const ButtonGoogleSingup = ({
  onClose,
  dispatch,
}: ButtonGoogleSingupProps) => {
  const [singUpCodeRes, setSingUpCodeRes] = useState<string | null>(null);
  const { loading } = useApiService<ApiResponse<User>>(() => {
    return singUpCodeRes
      ? dispatch(registerFromGoogle({ code: singUpCodeRes })).then((res) =>
          onSingUp(res.payload as ApiResponse<User>)
        )
      : Promise.resolve({} as ApiResponse<User>);
  }, [singUpCodeRes]);

  console.log('singUpCodeRes', singUpCodeRes);

  const onSingUp = (apiRes: ApiResponse<User>) => {
    if (apiRes.success) {
      onClose();
      alert('User created successfully!');
    } else {
      alert(
        Array.isArray(apiRes.message)
          ? apiRes.message.map((m) => m).join('\n')
          : apiRes.message
      );
    }
    return apiRes;
  };

  const signUp = useGoogleLogin({
    flow: 'auth-code', // auth-code or implicit
    // prompt: 'select_account', // none, consent, select_account
    onSuccess: (response) => {
      setSingUpCodeRes(response.code);
    },
  });

  // const signUp = useGoogleLogin({
  //   flow: 'auth-code', // auth-code or implicit
  //   // prompt: 'select_account', // none, consent, select_account
  //   onSuccess: (response) => {
  //     console.log('tokenResponse', response);
  //     dispatch(registerFromGoogle({ code: response.code })).then((res) => {
  //       let resPayload = res.payload as ApiResponse<User>;
  //       if (resPayload.success) {
  //         onClose();
  //         alert('User created successfully!');
  //       } else {
  //         alert(
  //           Array.isArray(resPayload.message)
  //             ? resPayload.message.map((m) => m).join('\n')
  //             : resPayload.message
  //         );
  //       }
  //     });
  //   },
  // });
  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => signUp()}>
        {loading && 'Loading...'}
        Sign Up with Google
      </Button>
    </>
  );
};
