import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CountryType, countries } from '../../../../models/CountryType';
import { FieldError } from 'react-hook-form';

interface CountrySelectProps {
  width?: string;
  value: string | null;
  onChange: (e: string | null) => void; // Para este caso e es un string
  error?: FieldError | undefined;
}

export default function CountrySelect({
  value,
  width = '100%',
  onChange,
}: CountrySelectProps) {
  const inputValue = value ? ({ label: value! } as CountryType) : null;

  return (
    <Autocomplete
      sx={{ width: width }}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      value={inputValue}
      onChange={(_event, newValue: CountryType | null) => {
        onChange(newValue ? newValue.label : null);
      }}
      // Las lineas comentadas hacen referencia al valor que puede escribir el usuario
      // y que es distinto al valor que se guarda en el state como opcion seleccionada
      // inputValue={value}
      // onInputChange={(event, newInputValue) => {
      //   setInputValue(newInputValue);
      // }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
          {/* ({option.code}) + 
          {option.phone} */}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          required
          {...params}
          // No va hacer falta ya que el autocomplete no va a permitir seleccionar un valor que no este en las opciones
          // error={!!error}
          // helperText={error ? error.message : null}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill (ver limitations en https://mui.com/material-ui/react-autocomplete/)
          }}
          margin="dense"
        />
      )}
    />
  );
}
