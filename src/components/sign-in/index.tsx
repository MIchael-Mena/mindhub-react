import { Button, Typography, Link, Grid, Box } from '@mui/material';
import { Email } from '@mui/icons-material';
import { InputPasswordControl } from '../input-password-control';
import { useForm } from 'react-hook-form';
import { InputTextControl } from '../input-text-control';
import { rules } from '../../models/rulesValidation';
import { login } from '../../store/actions/user';
import { useAppDispatch } from '../../store/hooks';
import { LoginForm } from '../../models/LoginForm';
import { ApiResponse } from '../../models/ApiResponse';
import { User } from '../../models/User';
import { ButtonForm } from '../button-form';
import { useState } from 'react';

interface SignInProps {
  onSignUpClick: () => void;
  onClose: () => void;
}

export const SignIn = ({ onSignUpClick, onClose }: SignInProps) => {
  const dispatch = useAppDispatch();

  const [payloadOfSubmit, setPayloadOfSubmit] = useState<{
    form: LoginForm;
  } | null>(null);

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const handleLogin = (data: LoginForm) => {
  //   dispatch(login(data)).then((res) => {
  //     let resPayload = res.payload as ApiResponse<User>;
  //     if (resPayload.success) {
  //       onClose();
  //     } else {
  //       alert(resPayload.message);
  //     }
  //   });
  // };

  const handleGoogleSignIn = () => {};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => setPayloadOfSubmit({ form: data }))}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit((data) => setPayloadOfSubmit({ form: data }))();
        }
      }}
      sx={{ maxWidth: 400, minWidth: 350, p: { xs: 2, md: 4 } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <InputTextControl
            name="email"
            label="Email"
            autoComplete="email"
            control={control}
            rules={rules.email}
            required
            InputProps={{
              startAdornment: <Email color="action" sx={{ mr: 2 }} />,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputPasswordControl
            useIcon
            required
            margin="dense"
            label="Password"
            name="password"
            control={control}
            rules={rules.password}
          />
        </Grid>

        <Grid item xs={12} display="flex" flexDirection="column" gap={2} mt={2}>
          <ButtonForm
            onSubmit={(form: LoginForm) =>
              dispatch(login(form)).then(
                (res) => res.payload as ApiResponse<User>
              )
            }
            payloadOfSubmit={payloadOfSubmit}
            onClose={onClose}
            buttonText="Sign in"
          />
          {/* <Button variant="contained" color="primary" type="submit">
            Sign In
          </Button> */}

          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography align="center">
            You do not have an account?
            <Link onClick={onSignUpClick} sx={{ cursor: 'pointer', ml: 1 }}>
              Sign Up
            </Link>
          </Typography>

          <Typography align="center">
            <Link href="#">Forgot password?</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
