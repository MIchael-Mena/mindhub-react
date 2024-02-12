import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentSearch = searchParam.get('search') || '';
  const pageParam = Number(searchParam.get('page')) || 1;

  // Maneja el estado del valor dentro del input, cuando el usuario decidad buscar,
  // se actualiza el valor de searchParam y la url
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Vuelve a renderizar el componente, y me garantiza que el valor de searchQuery sea el ultimo
    setSearchQuery(event.target.value);
  };

  // accion lanzada cuando el usuario da click en el boton de buscar
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery === currentSearch) return;
    setSearchParam(
      (params: URLSearchParams) => {
        if (!searchQuery) {
          params.delete('search');
        } else {
          params.set('search', searchQuery);
          if (pageParam !== 1) params.set('page', '1');
        }
        return params;
      },
      { preventScrollReset: false }
    );
  };

  const handleClearSearch = () => setSearchQuery('');

  // Para que en renderizados despues del primero, el valor de searchQuery siempre sea el ultimo
  // que figura en la url (en caso de que la url haya cambiado al navegar hacia atras o adelante)
  useEffect(() => {
    if (currentSearch === searchQuery) return;
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
  };
};

export default useSearch;
