import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { citiesSortOptionsMapping } from '../../util/cities-sort-options';
import { SortButton } from '../../../shared/components/sort-button';

export const SortCities = () => {
  const [sortParam, setSortParam] = useSearchParams();
  const sortValue = sortParam.get('sort');

  const currentSort =
    !sortValue || !(sortValue in citiesSortOptionsMapping)
      ? 'Most recent'
      : sortValue;

  const deleteSortParam = () => {
    setSortParam(
      (params: URLSearchParams) => {
        params.delete('sort');
        return params;
      },
      { preventScrollReset: true }
    );
  };

  const handleSort = (selectedSort: string) => {
    if (selectedSort === 'Most recent') {
      deleteSortParam();
    } else {
      setSortParam(
        (params: URLSearchParams) => {
          params.set('sort', selectedSort);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    // Si la buscado esta vacia (sortValue === null) o si el valor de sortValue es valido, no hago nada
    if (!sortValue || sortValue in citiesSortOptionsMapping) return;
    deleteSortParam();
  }, [sortValue]);

  return (
    <SortButton
      currentSort={currentSort}
      sortsAvailable={citiesSortOptionsMapping}
      onSortSelected={handleSort}
    />
  );
};

// Version 2 con Select de Material UI
/* export const SortButton = () => {
  const [sortParam, setSortParam] = useSearchParams();
  const sortValue = sortParam.get('sort');

  const currentSort =
    !sortValue || !(sortValue in sortOptionsMapping)
      ? 'Most recent'
      : sortValue;

  const deleteSortParam = () => {
    setSortParam(
      (params: URLSearchParams) => {
        params.delete('sort');
        return params;
      },
      { preventScrollReset: true }
    );
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newSortValue = event.target.value as string;
    if (newSortValue === currentSort) return;
    if (newSortValue === 'Most recent') {
      deleteSortParam();
    } else {
      setSortParam(
        (params: URLSearchParams) => {
          params.set('sort', newSortValue);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    // Si la buscado esta vacia (sortValue === null) o si el valor de sortValue es valido, no hago nada
    if (!sortValue || sortValue in sortOptionsMapping) return;
    deleteSortParam();
  }, [sortValue]);

  return (
    <>
      <SortIcon />
      <Typography variant="h6" whiteSpace="nowrap">
        Sort by:
      </Typography>
      <Select
        type="text"
        sx={{ borderRadius: '0.7rem' }}
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
}; */
