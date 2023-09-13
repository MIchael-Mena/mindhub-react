import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CountryType, countries } from '../../models/CountryType';
import { FieldError } from 'react-hook-form';

interface CountrySelectProps {
  width?: string;
  value?: string;
  onChange: (e: any) => void;
  error?: FieldError | undefined;
}

export default function CountrySelect({
  width = '100%',
  onChange,
}: CountrySelectProps) {
  return (
    <Autocomplete
      id="country-select"
      sx={{ width: width }}
      // inputValue={value}
      onChange={(_event, newValue: CountryType | null) => {
        onChange(newValue ? newValue.label : null);
      }}
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
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill (ver limitations en https://mui.com/material-ui/react-autocomplete/)
          }}
        />
      )}
    />
  );
}
