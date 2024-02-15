import { useLocation } from 'react-router-dom';
import {
  citiesSortOptions,
  defaultSortOption,
} from '../util/cities-sort-options';
import { useMemo } from 'react';

/* 
  Este hook se encarga de obtener los parametros de la url y parsearlos a los valores que se usan en el backend
  (por ejemplo, el valor que se muestra en el select es distinto al que se usa en el backend)
*/
export const useUrlParams = () => {
  const location = useLocation(); // Se actualiza cada vez que cambia la url

  const { searchParam, pageParam, sortParam, orderParam } = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchParam = urlParams.get('search') || '';
    const pageParam = Number(urlParams.get('page')) || 1;
    const orderParam = (urlParams.get('order') || 'desc') as 'asc' | 'desc';

    const sortParamRaw = urlParams.get('sort');
    const isSortParamValid =
      sortParamRaw &&
      citiesSortOptions.some((option) => option.rawValue === sortParamRaw);
    const sortParam = isSortParamValid
      ? sortParamRaw
      : defaultSortOption.rawValue;

    return { searchParam, pageParam, sortParam, orderParam };
  }, [location.search]);

  return { searchParam, pageParam, sortParam, orderParam };
};
