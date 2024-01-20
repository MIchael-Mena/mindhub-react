import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sortOptionsMapping } from '../../util/sort-options';

export const SortButton = () => {
  const [sortParam, setSortParam] = useSearchParams();
  const sortValue = sortParam.get('sort');

  const currentSort =
    !sortValue || !(sortValue in sortOptionsMapping)
      ? 'More recent'
      : sortValue;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newSortValue = event.target.value as string;
    if (newSortValue === currentSort) return;
    setSortParam(
      (params: URLSearchParams) => {
        if (newSortValue === 'More recent') {
          params.delete('sort');
        } else {
          params.set('sort', newSortValue);
        }
        return params;
      },
      { preventScrollReset: true }
    );
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    // Si la buscado esta vacia (sortValue === null) o si el valor de sortValue es valido, no hago nada
    if (!sortValue || (sortValue && sortValue in sortOptionsMapping)) return;

    // En otro caso elimino el parametro sort de la url
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
        value={currentSort}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {Object.keys(sortOptionsMapping).map((sort) => (
          <MenuItem key={sort} value={sort}>
            {sort}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
