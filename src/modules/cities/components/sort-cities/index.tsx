import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CITIES_SORT_OPTIONS,
  CITIES_SORT_OPTIONS_LABELS,
  CITIES_DEFAULT_SORT_OPTION,
} from '../../util/sort-options';
import { SortButton } from '../../../shared/components/sort-button';

export const SortCities = () => {
  const [params, setParams] = useSearchParams();
  const sortRaw = params.get('sort');
  const orderRaw = params.get('order');
  const orderParam = orderRaw || CITIES_DEFAULT_SORT_OPTION.order;

  const currentSorRawIndex = CITIES_SORT_OPTIONS.findIndex(
    (option) => option.rawValue === sortRaw && option.order === orderParam
  );
  const sortRawIsValid = currentSorRawIndex !== -1;
  // Si sortRaw no es válido, establece currentSortIndex al índice de defaultSortOption
  const currentSortIndex = sortRawIsValid
    ? currentSorRawIndex
    : CITIES_SORT_OPTIONS.indexOf(CITIES_DEFAULT_SORT_OPTION);

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
    if (
      selectedSortIndex ===
      CITIES_SORT_OPTIONS.indexOf(CITIES_DEFAULT_SORT_OPTION)
    ) {
      deleteParams(['sort', 'order']);
    } else {
      setParams(
        (params: URLSearchParams) => {
          params.set('sort', CITIES_SORT_OPTIONS[selectedSortIndex].rawValue);
          params.set('order', CITIES_SORT_OPTIONS[selectedSortIndex].order);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

  // Lo uso para controlar que el valor de sortValue sea valido en la url (si no lo es, lo elimino)
  useEffect(() => {
    // Solo me interesa el caso en el que hay algo en sortRaw y orderRaw que no es valido,
    // ignoro si son undefined es decir en la url no hay sort ni order (en ese caso se usara el valor por defecto)
    const orderRawIsInvalid = orderRaw && !['asc', 'desc'].includes(orderRaw);
    const sortRawIsInvalid = sortRaw && !sortRawIsValid;

    if (sortRawIsInvalid && orderRawIsInvalid) {
      deleteParams(['sort', 'order']);
    } else if (sortRawIsInvalid) {
      deleteParams(['sort']);
    } else if (orderRawIsInvalid) {
      deleteParams(['order']);
    }
  }, [sortRaw, orderRaw]);

  return (
    <SortButton
      currentSortIndex={currentSortIndex}
      sortsAvailable={CITIES_SORT_OPTIONS_LABELS}
      onSortSelected={handleSort}
    />
  );
};
