import {
  DatePicker,
  DatePickerSlotsComponentsProps,
} from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import {
  FieldError,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { useMemo } from 'react';

// TODO: Refactorizar para que se pueda usar en cualquier formulario

interface DatePickerControlledProps {
  // value?: string | null;
  value: Dayjs | null;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: (value: string | null) => void;
  onChange: (value: Dayjs | null) => void;
  error: FieldError | undefined;
  label: string;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
}

// EL locale se encuentra en main.tsx
export const DatePickerControlled = ({
  value,
  onChange,
  error,
  label,
}: DatePickerControlledProps) => {
  const yesterday = useMemo(() => dayjs().subtract(1, 'day'), []);

  const handleDataChange = (date: Dayjs | null) => {
    // const formattedDate =
    //   dayjs(date).isValid() && yesterday.isAfter(date)
    //     ? dayjs(date).format('YYYY-MM-DD')
    //     : null;
    // onChange(formattedDate); // Llamo a onChange con la fecha formateada
    onChange(date);
  };

  // const errorMessage = (errorDate: string) => {
  //   switch (errorDate) {
  //     case 'maxDate': {
  //       return 'Please select a date in the last quarter of 2022';
  //     }
  //     case 'minDate': {
  //       return 'Please select a date in the first quarter of 2022';
  //     }

  //     case 'invalidDate': {
  //       return 'Your date is not valid';
  //     }

  //     default: {
  //       return '';
  //     }
  //   }
  // };

  console.log('DatePickerControlled', error?.message);

  return (
    <>
      <DatePicker
        // sx={{ width: '100%' }}
        maxDate={yesterday}
        // disableFuture  // Deshabilita las fechas futuras pero en el calendario se pueden ver
        // onError={}
        // value={value}
        label={label}
        // defaultValue={value ? dayjs(value) : null}
        // value={value ? dayjs(value) : null}
        value={value}
        onChange={handleDataChange}
        // onError={(error) => {
        //   if (error) {
        //     console.log(error);
        //     setError('birthDate', {
        //       type: 'manual',
        //       message: errorMessage(error),
        //     });
        //   } else {
        //     clearErrors('birthDate');
        //   }
        // }}
        // slots={{
        //   textField: (props) => (
        //     <TextField
        //       {...props}
        //       // error={!!error}
        //       // helperText={error ? error.message : null}
        //       // variant="filled"
        //       fullWidth
        //       required
        //       margin="normal"
        //     />
        //   ),
        // }}
        slotProps={
          {
            textField: {
              required: true,
              margin: 'normal',
              error: !!error,
              helperText: error ? error.message : null,
              fullWidth: true,
            },
          } as DatePickerSlotsComponentsProps<Dayjs>
        }
      />
    </>
  );
};
