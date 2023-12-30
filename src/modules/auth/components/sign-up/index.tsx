import { Box, Grid, Link, Typography } from '@mui/material';
import { DatePickerControl } from '../../../shared/components/date-picker-control';
import CountrySelect from '../../../shared/components/country-select';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../../../models/User';
import { InputTextControl } from '../../../shared/components/input-text-control';
import { rules } from '../../../../models/rulesValidation';
import { useAppDispatch } from '../../../../store/hooks';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { InputPasswordControl } from '../../../shared/components/input-password-control';
import { ButtonForm } from '../../../shared/components/button-form';
import { ApiResponse } from '../../../../models/ApiResponse';
import { register, registerWithGoogle } from '../../../../store/actions/user';
import { ButtonGoogle } from '../button-google';

interface SignUpProps {
  onSignInClick: () => void;
  onClose: () => void;
}

interface SignUpExtended {
  confirmPassword?: string; // Lo delcaro como opcional para poder usar el operador delete
  birthDate: Dayjs | null;
}

type SignUpForm = User & SignUpExtended;

export const SignUp = ({ onSignInClick, onClose }: SignUpProps) => {
  const { control, handleSubmit } = useForm<SignUpForm>({
    // mode: 'onTouched',
    delayError: 1000,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      country: null,
      // Para iniciar una fecha por defecto, se debe usar el tipo Dayjs: dayjs('2021-10-10')
      birthDate: null, // reconoze 'yyyy-mm-dd' (formato valido para el backend) y 'mm-dd-yyyy' entre otros
      profilePic: '',
    },
  });

  const [payloadOfSubmit, setPayloadOfSubmit] = useState<{ form: User } | null>(
    null
  );
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    const { confirmPassword, ...user } = data;
    setPayloadOfSubmit({
      form: { ...user, birthDate: user.birthDate?.format('YYYY-MM-DD') },
    });
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          maxWidth: 450,
          minWidth: 350,
          p: { xs: 2, md: 4 },
          overflowY: 'auto',
          maxHeight: { xs: '90vh', md: '80vh' },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Create an account
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <InputTextControl
              name="firstName"
              label="First Name"
              control={control}
              rules={rules.firstName}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <InputTextControl
              name="lastName"
              label="Last Name"
              control={control}
              rules={rules.lastName}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <InputTextControl
              name="email"
              label="Email"
              autoComplete="email"
              placeholder="name@example.com"
              control={control}
              rules={rules.email}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <InputPasswordControl
              label="Password"
              name="password"
              required
              margin="dense"
              control={control}
              rules={rules.password}
            />
          </Grid>

          <Grid item xs={12}>
            <InputPasswordControl
              label="Confirm Password"
              name="confirmPassword"
              required
              margin="dense"
              control={control}
              rules={rules.confirmPassword}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="country"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
            <DatePickerControl
              label="Birth Date"
              control={control}
              rules={rules.birthDate}
              name="birthDate"
              margin="dense"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <InputTextControl
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
            <ButtonForm
              onSubmit={(form: User) =>
                dispatch(register(form)).then(
                  (res) => res.payload as ApiResponse<User>
                )
              }
              payloadOfSubmit={payloadOfSubmit}
              onClose={onClose}
              buttonText="Sign up"
            />

            <ButtonGoogle
              onClose={onClose}
              buttonText="Sign up with Google"
              dispatchGoogle={(googleCode: string) =>
                dispatch(registerWithGoogle({ code: googleCode })).then(
                  (res) => res.payload as ApiResponse<User>
                )
              }
            />
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
      </Box>
    </>
  );
};
