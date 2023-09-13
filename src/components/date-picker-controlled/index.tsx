import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FieldError } from 'react-hook-form';

interface DatePickerControlledProps {
  value?: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (value: string | null) => void;
  error: FieldError | undefined;
  label: string;
}

export const DatePickerControlled = ({
  value,
  onChange,
  error,
  label,
}: DatePickerControlledProps) => {
  const yesterday = dayjs().subtract(1, 'day');

  const handleDataChange = (date: Dayjs | null) => {
    const formattedDate = date
      ? dayjs(date).format('MM-DD-YYYY') // Formatea la fecha
      : null;
    console.log('DatePickerControlled: ', formattedDate);
    onChange(formattedDate); // Llama a onChange con la fecha formateada
  };

  return (
    <>
      {/* El locale se puede poner en el index.tsx de la app */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <DatePicker
          sx={{ width: '100%' }}
          maxDate={yesterday}
          // disableFuture
          label={label}
          defaultValue={value ? dayjs(value) : null}
          onChange={handleDataChange}
        />
      </LocalizationProvider>
    </>
  );
};
// onError={}
// value={value}
// onChange={(newValue) => setValue(newValue)}
