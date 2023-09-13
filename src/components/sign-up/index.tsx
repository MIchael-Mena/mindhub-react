import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { DatePickerControlled } from '../date-picker-controlled';
import CountrySelect from '../country-select';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../models/User';
import { FormInputText } from '../form-input-text';
import { rules } from '../../models/rulesValidation';

export const SignUp = ({ onSignInClick }: { onSignInClick: () => void }) => {
  const { control, handleSubmit } = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      surname: '',
      country: '', // TODO: falta implementar en CountrySelect para que funcione el valor por defecto
      birthDate: '',
      profilePic: '',
    },
  });

  const handleRegister = (data: any) => {
    console.log('Registrando usuario', data);
  };

  const handleGoogleSignUp = () => {};

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(handleRegister)}
        sx={{ maxWidth: 400, minWidth: 350, p: { xs: 2, md: 4 } }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Create an account
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FormInputText
            name="name"
            label="Name"
            control={control}
            rules={rules.name}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="surname"
            label="Surname"
            control={control}
            rules={rules.surname}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            name="email"
            label="Email"
            control={control}
            rules={rules.email}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            name="password"
            label="Password"
            control={control}
            rules={rules.password}
            required
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="country"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <CountrySelect
                onChange={onChange}
                // onChange={(e) => onChange(e.target.textContent)}
                error={error}
              />
            )}
          />
          {/* // <CountrySelect /> */}
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerControlled
                label="Birth Date"
                onChange={onChange}
                error={error}
                value={value}
              />
            )}
          />

          {/* <TextField
              label="Birth Date"
              variant="outlined"
              fullWidth
              type="date"
              name="birthDate"
              // value={formData.birthDate}
              // onChange={handleChange}
              required
            /> */}
        </Grid>
        <Grid
          item
          xs={12}
          display="inline-flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Do you already have an account?
            <Link
              onClick={onSignInClick}
              sx={{ cursor: 'pointer', ml: 1, display: 'inline-block' }}
            >
              Sign In
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
