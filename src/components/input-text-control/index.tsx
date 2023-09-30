import { TextField, TextFieldProps } from '@mui/material';
import { Controller, RegisterOptions } from 'react-hook-form';
import { InputErrorAlert } from '../input-error-alert';

interface InputTextControlProps {
  name: string;
  control: any;
  rules?: RegisterOptions;
}

export const InputTextControl = ({
  name,
  control,
  rules,
  defaultValue,
  ...rest
}: InputTextControlProps & TextFieldProps) => {
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
          FormHelperTextProps={{ component: 'div' }} // Para que el helperText sea un div y no un p, y evitar un warning
          error={!!error} // !!error es para convertir el error en booleano
          helperText={
            error ? <InputErrorAlert message={error.message!} /> : null
          }
          variant="outlined"
          fullWidth
          value={value}
          onChange={onChange}
          margin="dense"
          {...rest}
        />
      )}
    />
  );
};
