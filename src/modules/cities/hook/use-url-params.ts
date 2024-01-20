import { useLocation } from 'react-router-dom';
import { sortOptionsMapping } from '../util/sort-options';

export const useUrlParams = () => {
  const location = useLocation(); // Se actualiza cada vez que cambia la url
  const urlParams = new URLSearchParams(location.search);

  const searchParam = urlParams.get('search') || '';
  const pageParam = Number(urlParams.get('page')) || 1;

  // contiene el valor que se muestra en el select (el mismo de la url) que es distinto al que se usa en el backend
  const sortParamRaw = urlParams.get('sort');
  const sortParam =
    sortOptionsMapping[
      (!sortParamRaw || !(sortParamRaw in sortOptionsMapping)
        ? 'More recent'
        : sortParamRaw) as keyof typeof sortOptionsMapping
    ];

  return { searchParam, pageParam, sortParam };
};
