import { TextField, TextFieldProps } from '@mui/material';
import { Controller, RegisterOptions } from 'react-hook-form';

interface FormInputTextProps {
  name: string;
  label: string;
  control: any;
  rules?: RegisterOptions;
  // defaultValue: string;
}

export const FormInputText = ({
  name,
  label,
  control,
  rules,
  defaultValue,
  ...rest
}: FormInputTextProps & TextFieldProps) => {
  return (
    <Controller
      name={name} // Lo utiliza para el control de errores
      control={control}
      rules={rules ? rules : {}}
      // defaultValue={defaultValue}
      render={({
        field: { onChange, value },
        fieldState: { error },
        // formState,
      }) => (
        <TextField
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
          variant="outlined"
          fullWidth
          value={value}
          onChange={onChange}
          margin="normal"
          {...rest}
        />
      )}
    />
  );
};
