import { Button, Typography, Link, Box, Grid } from '@mui/material';
import { Email } from '@mui/icons-material';
import { InputPassword } from '../input-password';
import { Controller, useForm } from 'react-hook-form';
import { FormInputText } from '../form-input-text';
import { rules } from '../../models/rulesValidation';

interface RegisterForm {
  email: string;
  password: string;
}

export const SignIn = ({ onSignUpClick }: { onSignUpClick: () => void }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as RegisterForm,
  });

  const handleRegister = (data: RegisterForm) => {
    console.log('Registrando usuario', data);
  };

  const handleGoogleSignIn = () => {};

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(handleRegister)}
      sx={{ maxWidth: 400, minWidth: 350, p: { xs: 2, md: 4 } }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome!
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormInputText
          name="email"
          label="Email"
          control={control}
          rules={rules.email}
          InputProps={{
            startAdornment: <Email color="action" sx={{ mr: 2 }} />,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="password"
          control={control}
          rules={rules.password}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputPassword value={value} onChange={onChange} error={error} />
          )}
        />
      </Grid>

      <Grid item xs={12} display="flex" flexDirection="column" gap={2} mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Sign In
        </Button>

        <Button variant="outlined" color="primary" onClick={handleGoogleSignIn}>
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
  );
};

export default SignIn;
