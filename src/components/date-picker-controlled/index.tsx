import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FieldError } from 'react-hook-form';

// TODO: Refactorizar para que se pueda usar en cualquier formulario

interface DatePickerControlledProps {
  value?: string | null;
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
    const formattedDate =
      dayjs(date).isValid() && yesterday.isAfter(date)
        ? dayjs(date).format('YYYY-MM-DD')
        : null;
    onChange(formattedDate); // Llamo a onChange con la fecha formateada
  };

  return (
    <>
      {/* El locale se puede poner en el index.tsx de la app */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <DatePicker
          sx={{ width: '100%' }}
          maxDate={yesterday}
          // disableFuture
          // onError={}
          // value={value}
          label={label}
          defaultValue={value ? dayjs(value) : null}
          onChange={handleDataChange}
        />
      </LocalizationProvider>
    </>
  );
};
