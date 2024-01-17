import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SortButton = () => {
  const availableSorts = ['More recent', 'City', 'Country'];
  const [sortParam, setSortParam] = useSearchParams();
  const sortValue = sortParam.get('sort');
  const currentSort =
    !sortValue || !availableSorts.includes(sortValue)
      ? 'More recent'
      : sortValue;
  const [selectedOption, setSelectedOption] = useState(currentSort);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
    if (event.target.value === currentSort) return;
    if (event.target.value === 'More recent') {
      setSortParam(
        (params: URLSearchParams) => {
          params.delete('sort');
          return params;
        },
        { preventScrollReset: true }
      );
    } else {
      setSortParam(
        (params: URLSearchParams) => {
          params.set('sort', event.target.value);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  useEffect(() => {
    if (sortValue && availableSorts.includes(sortValue)) return;
    setSortParam(
      (params: URLSearchParams) => {
        params.delete('sort');
        return params;
      },
      { preventScrollReset: true }
    );
  }, [sortValue]);

  return (
    <>
      <SortIcon />
      <Typography variant="h6" whiteSpace="nowrap">
        Sort by:
      </Typography>
      <Select
        variant="outlined"
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="More recent">More recent</MenuItem>
        <MenuItem value="City">City</MenuItem>
        <MenuItem value="Country">Country</MenuItem>
      </Select>
    </>
  );
};
