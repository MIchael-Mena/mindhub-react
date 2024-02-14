import { useLocation } from 'react-router-dom';
import {
  citiesSortOptionsMapping,
  defaultSort,
} from '../util/cities-sort-options';

/* 
  Este hook se encarga de obtener los parametros de la url y parsearlos a los valores que se usan en el backend
  (por ejemplo, el valor que se muestra en el select es distinto al que se usa en el backend)
*/
export const useUrlParams = () => {
  const location = useLocation(); // Se actualiza cada vez que cambia la url
  const urlParams = new URLSearchParams(location.search);

  const searchParam = urlParams.get('search') || '';
  const pageParam = Number(urlParams.get('page')) || 1;
  const orderParam = (urlParams.get('order') || 'desc') as 'asc' | 'desc';

  const sortParamRaw = urlParams.get('sort');
  const sortParam =
    citiesSortOptionsMapping[
      (!sortParamRaw || !(sortParamRaw in citiesSortOptionsMapping)
        ? defaultSort
        : sortParamRaw) as keyof typeof citiesSortOptionsMapping
    ].split('_')[0];

  return { searchParam, pageParam, sortParam, orderParam };
};
