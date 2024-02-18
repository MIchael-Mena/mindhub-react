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
import { Controller, RegisterOptions } from 'react-hook-form';
import { InputErrorAlert } from '../input-error-alert';

interface InputPasswordControlProps {
  name: string;
  label: string;
  control: any;
  margin?: 'dense' | 'normal' | 'none';
  required?: boolean;
  rules?: RegisterOptions;
  useIcon?: boolean;
  preventCutCopyPaste?: boolean;
}

export const InputPasswordControl = ({
  name,
  label,
  control,
  rules,
  margin = 'none',
  required = false,
  useIcon = false,
  preventCutCopyPaste = false,
}: InputPasswordControlProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl
            variant="outlined"
            margin={margin}
            required={required}
            fullWidth
            // hiddenLabel
          >
            <InputLabel htmlFor={name} color={error ? 'error' : 'primary'}>
              {label}
            </InputLabel>

            <OutlinedInput // Para la variant filled o standard, usar el componente Input
              onPaste={(e) => (preventCutCopyPaste ? e.preventDefault() : null)}
              label={label}
              id={name}
              error={!!error}
              onChange={onChange}
              value={value}
              type={showPassword ? 'text' : 'password'}
              startAdornment={
                useIcon && (
                  <InputAdornment position="start">
                    <Lock color="action" sx={{ mr: 1 }} />
                  </InputAdornment>
                )
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
            {error && (
              <FormHelperText component="div" error>
                <InputErrorAlert message={error.message!} />
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </>
  );
};
