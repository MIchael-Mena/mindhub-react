import { Button, Grid, Link, Typography } from '@mui/material';
import { DatePickerControlled } from '../date-picker-controlled';
import CountrySelect from '../country-select';
import { Controller, useForm } from 'react-hook-form';
import { User } from '../../models/User';
import { FormInputText } from '../form-input-text';
import { rules } from '../../models/rulesValidation';
import { register } from '../../store/actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { useAppDispatch } from '../../store/hooks';
import { ButtonGoogleSingup } from '../button-google-singup';
// import { useAppDispatch } from '../../store/hooks';
// import { register } from '../../store/actions/user';
// import { ApiResponse } from '../../models/ApiResponse';

interface SignUpProps {
  onSignInClick: () => void;
  onClose: () => void;
}

export const SignUp = ({ onSignInClick, onClose }: SignUpProps) => {
  const { control, handleSubmit } = useForm<User>({
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

  const dispatch = useAppDispatch();

  const handleRegister = (data: User) => {
    // Saco los campos que no son obligatorios
    if (!data.birthDate) delete data.birthDate;
    if (!data.country) delete data.country;
    dispatch(register(data)).then((res) => {
      let resPayload = res.payload as ApiResponse<User>;
      if (resPayload.success) {
        onClose();
        alert('User created successfully!');
      } else {
        alert(
          Array.isArray(resPayload.message)
            ? resPayload.message.map((m) => m).join('\n')
            : resPayload.message
        );
      }
    });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(handleRegister)}
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
            render={({ field: { onChange }, fieldState: { error } }) => (
              <CountrySelect
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePickerControlled
                label="Birth Date"
                onChange={onChange}
                error={error}
                value={value}
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
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>

          <ButtonGoogleSingup onClose={onClose} dispatch={dispatch} />

          {/* <Button variant="outlined" color="primary" onClick={() => signUp()}>
            Sign Up with Google
          </Button> */}
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
