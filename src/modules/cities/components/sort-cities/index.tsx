import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  citiesSortOptionsMapping,
  defaultSort,
} from '../../util/cities-sort-options';
import { SortButton } from '../../../shared/components/sort-button';

export const SortCities = () => {
  const [params, setParams] = useSearchParams();
  const sortRaw = params.get('sort');
  const orderRaw = params.get('order');

  const currentSort =
    !sortRaw || !(sortRaw in citiesSortOptionsMapping) ? defaultSort : sortRaw;

  const deleteParams = (paramNames: string[]) => {
    setParams(
      (params: URLSearchParams) => {
        paramNames.forEach((paramName) => params.delete(paramName));
        return params;
      },
      { preventScrollReset: true }
    );
  };

  const handleSort = (selectedSort: string) => {
    if (selectedSort === defaultSort) {
      deleteParams(['sort', 'order']);
    } else {
      setParams(
        (params: URLSearchParams) => {
          params.set('sort', selectedSort);
          params.set(
            'order',
            citiesSortOptionsMapping[
              selectedSort as keyof typeof citiesSortOptionsMapping
            ].split('_')[1]
          );
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    // Si la buscado esta vacia (sortValue === null) o si el valor de sortValue es valido, no hago nada
    // if (!sortRaw || sortRaw in citiesSortOptionsMapping) return;
    // deleteSortParam();

    const sortParamIsInvalid =
      sortRaw && !(sortRaw in citiesSortOptionsMapping);
    const orderParamIsInvalid = orderRaw && !['asc', 'desc'].includes(orderRaw);

    if (sortParamIsInvalid && orderParamIsInvalid) {
      deleteParams(['sort', 'order']);
    } else if (sortParamIsInvalid) {
      deleteParams(['sort']);
    } else if (orderParamIsInvalid) {
      deleteParams(['order']);
    }
  }, [sortRaw]);

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
