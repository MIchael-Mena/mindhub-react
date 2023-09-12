// import React, { useState } from 'react';
import { TextField, Button, Typography, Link } from '@mui/material';
import { Email } from '@mui/icons-material';
import { InputPassword } from '../input-password';
import { Controller, useForm } from 'react-hook-form';

interface RegisterForm {
  email: string;
  password: string;
}

const rules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Entered value does not match email format',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters',
    },
  },
};

export const SignIn = () => {
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
    <form onSubmit={handleSubmit(handleRegister)}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome!
      </Typography>

      <Controller
        name="email"
        control={control}
        rules={rules.email}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            error={!!error}
            helperText={error ? error.message : null}
            label="Email"
            variant="outlined"
            fullWidth
            value={value}
            onChange={onChange}
            margin="normal"
            InputProps={{
              startAdornment: <Email color="action" sx={{ mr: 2 }} />,
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={rules.password}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputPassword value={value} onChange={onChange} error={error} />
        )}
      />

      <Button
        sx={{ my: 3 }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit(handleRegister)}
      >
        Sign In
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleGoogleSignIn}
        sx={{ mt: 3 }}
      >
        Sign In with Google
      </Button>
      <Typography align="center" style={{ marginTop: '1rem' }}>
        You do not have an account? <Link href="#">Sign Up</Link>
        {/* Do you already have an account? <Link href="#">Sign In</Link> */}
      </Typography>
      <Typography align="center" mt={1}>
        <Link href="#">Forgot password?</Link>
      </Typography>
    </form>
  );
};

export default SignIn;
