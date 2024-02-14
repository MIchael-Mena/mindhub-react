import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  citiesSortOptions,
  citiesSortOptionsLabels,
  defaultSortOption,
} from '../../util/cities-sort-options';
import { SortButton } from '../../../shared/components/sort-button';

export const SortCities = () => {
  const [params, setParams] = useSearchParams();
  const sortRaw = params.get('sort');
  const orderRaw = params.get('order');

  const currentSorRawIndex = citiesSortOptions.findIndex(
    (option) => option.rawValue === sortRaw
  );
  const sortRawIsValid = currentSorRawIndex !== -1;
  // Si sortRaw no es válido, establece currentSortIndex al índice de defaultSortOption
  const currentSortIndex = sortRawIsValid
    ? currentSorRawIndex
    : citiesSortOptions.indexOf(defaultSortOption);

  const deleteParams = (paramNames: string[]) => {
    setParams(
      (params: URLSearchParams) => {
        paramNames.forEach((paramName) => params.delete(paramName));
        return params;
      },
      { preventScrollReset: true }
    );
  };

  const handleSort = (selectedSortIndex: number) => {
    // Tambien funcionaria: citiesSortOptions[selectedSortIndex] === defaultSortOption
    // ya que defaultSortOption es el primer elemento de citiesSortOptions (es el mismo objeto)
    if (selectedSortIndex === citiesSortOptions.indexOf(defaultSortOption)) {
      deleteParams(['sort', 'order']);
    } else {
      setParams(
        (params: URLSearchParams) => {
          params.set('sort', citiesSortOptions[selectedSortIndex].rawValue);
          params.set('order', citiesSortOptions[selectedSortIndex].order);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    const orderRawIsInvalid = orderRaw && !['asc', 'desc'].includes(orderRaw);

    if (!sortRawIsValid && orderRawIsInvalid) {
      deleteParams(['sort', 'order']);
    } else if (!sortRawIsValid) {
      deleteParams(['sort']);
    } else if (orderRawIsInvalid) {
      deleteParams(['order']);
    }
  }, [sortRaw, orderRaw]);

  return (
    <SortButton
      currentSortIndex={currentSortIndex}
      sortsAvailable={citiesSortOptionsLabels}
      onSortSelected={handleSort}
    />
  );
};
