import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState, MouseEvent } from 'react';
import { FieldError } from 'react-hook-form';

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: FieldError | undefined;
}

export const InputPassword = ({
  value,
  onChange,
  error,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl variant="outlined" margin="normal" fullWidth>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <OutlinedInput
          label="Password"
          error={!!error}
          onChange={onChange}
          value={value}
          type={showPassword ? 'text' : 'password'}
          startAdornment={
            <InputAdornment position="start">
              <Lock color="action" sx={{ mr: 1 }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error>{error?.message}</FormHelperText>
      </FormControl>
    </>
  );
};

// <FormHelperText error>{errors.password.required}</FormHelperText>
