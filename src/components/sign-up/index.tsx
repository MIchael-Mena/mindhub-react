import { Grid, Link, Typography } from '@mui/material';
import { DatePickerControlled } from '../date-picker-controlled';
import CountrySelect from '../country-select';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../models/User';
import { FormInputText } from '../form-input-text';
import { rules } from '../../models/rulesValidation';
import { useAppDispatch } from '../../store/hooks';
import { ButtonGoogleSingup } from '../button-google-singup';
import { useState } from 'react';
import { ButtonFormSingup } from '../button-form-singup';
import { Dayjs } from 'dayjs';

interface SignUpProps {
  onSignInClick: () => void;
  onClose: () => void;
}

export const SignUp = ({ onSignInClick, onClose }: SignUpProps) => {
  const { control, handleSubmit, setError, clearErrors } = useForm<
    User & { birthDate: Dayjs | null }
  >({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      country: null, // TODO: falta implementar en CountrySelect para que funcione el valor por defecto
      birthDate: null, // reconoze 'yyyy-mm-dd' (formato valido para el backend) y 'mm-dd-yyyy' entre otros
      profilePic: '',
    },
  });

  console.log('form', control._formState.isValid);

  const [onSubmit, setOnSubmit] = useState<{ user: User } | null>(null);
  const dispatch = useAppDispatch();

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit((data) =>
          setOnSubmit({
            user: { ...data, birthDate: data.birthDate?.format('YYYY-MM-DD') },
          })
        )}
        sx={{ maxWidth: 450, minWidth: 350, p: { xs: 2, md: 4 } }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Create an account
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <FormInputText
            name="firstName"
            label="First Name"
            control={control}
            rules={rules.firstName}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormInputText
            name="lastName"
            label="Last Name"
            control={control}
            rules={rules.lastName}
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

        <Grid item xs={12} md={6}>
          <Controller
            name="country"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CountrySelect
                value={value!}
                onChange={onChange}
                // onChange={(e) => onChange(e.target.textContent)}
                error={error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="birthDate"
            control={control}
            rules={rules.birthDate}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerControlled
                label="Birth Date"
                onChange={onChange}
                error={error}
                value={value}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormInputText
            name="profilePic"
            label="Image URL"
            control={control}
            required
          />
        </Grid>

        <Grid
          item
          xs={12}
          display="inline-flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          <ButtonFormSingup
            onSubmit={onSubmit}
            onClose={onClose}
            dispatch={dispatch}
          />

          <ButtonGoogleSingup onClose={onClose} dispatch={dispatch} />
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
