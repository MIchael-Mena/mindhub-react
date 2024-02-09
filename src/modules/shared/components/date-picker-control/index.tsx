import {
  DatePicker,
  DatePickerSlotsComponentsProps,
} from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, RegisterOptions } from 'react-hook-form';
import { useMemo } from 'react';
import { InputErrorAlert } from '../input-error-alert';

interface DatePickerControlProps {
  name: string;
  label: string;
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  control: any;
  rules?: RegisterOptions;
}

// EL locale se encuentra en main.tsx
export const DatePickerControl = ({
  required = false,
  margin = 'none',
  name,
  label,
  control,
  rules,
}: DatePickerControlProps) => {
  const yesterday = useMemo(() => dayjs().subtract(1, 'day'), []);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            maxDate={yesterday}
            // disableFuture  // Deshabilita las fechas futuras pero en el calendario se pueden ver
            label={label}
            // defaultValue={} // Usarlo si se decide usar el componente como uncontrolled
            value={value}
            onChange={(date: Dayjs | null) => onChange(date)}
            // onError={(error) =>  {}} // error es un string y puede valer: 'maxDate', 'minDate', 'invalidDate'
            slotProps={
              {
                textField: {
                  margin: margin,
                  required: required,
                  error: !!error,
                  helperText: error ? (
                    <InputErrorAlert message={error.message!} />
                  ) : null,
                  fullWidth: true,
                  label: label,
                  FormHelperTextProps: { component: 'div' },
                },
              } as DatePickerSlotsComponentsProps<Dayjs>
            }
          />
        )}
      />
    </>
  );
};
