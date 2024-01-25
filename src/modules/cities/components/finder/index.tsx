import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import './Finder.css';

const Finder = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentSearch = searchParam.get('search') || '';
  const pageParam = Number(searchParam.get('page')) || 1;

  // Maneja el estado del valor dentro del input, cuando el usuario decidad buscar, se actualiza el valor de searchParam y la url
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Vuelve a renderizar el componente, y me garantiza que el valor de searchQuery sea el ultimo
    setSearchQuery(event.target.value);
  };

  // accion lanzada cuando el usuario da click en el boton de buscar
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery === currentSearch) return; // si no hay cambios, no hago nada
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
      { preventScrollReset: true }
    );
  };

  // Para que en renderizados despues del primero, el valor de searchQuery siempre sea el ultimo
  // que figura en la url (en caso de que la url haya cambiado al navegar hacia atras o adelante)
  useEffect(() => {
    if (currentSearch === searchQuery) return;
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Box
          sx={{
            boxSizing: 'content-box',

            border: '1px solid #ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
            py: 1,
            px: 2,
            boxShadow: 5,
            ':hover': {
              boxShadow: 10,
            },
            ':focus-within': {
              outline: '2px solid',
              outlineColor: (theme) => theme.palette.secondary.main,
            },
            transition: 'box-shadow 0.3s ease-in-out',
          }}
        >
          <InputBase
            placeholder="Find your city"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              marginLeft: 1,
              flex: 1,
              color: 'black',
            }}
          />
          <IconButton type="submit" sx={{ padding: '10px' }} color="secondary">
            <SearchIcon />
          </IconButton>
        </Box>
      </form>
    </>
  );
};

export default Finder;
