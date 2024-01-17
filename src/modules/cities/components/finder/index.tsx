import { ChangeEvent, useState, FormEvent } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import './Finder.css';

const Finder = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentSearch = searchParam.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Vuelve a renderizar el componente, y me garantiza que el valor de searchQuery sea el ultimo
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery === currentSearch) return; // si no hay cambios, no hago nada
    if (!searchQuery) {
      setSearchParam(
        (params: URLSearchParams) => {
          params.delete('search');
          return params;
        },
        { preventScrollReset: true }
      );
    } else {
      setSearchParam(
        (params: URLSearchParams) => {
          params.set('search', searchQuery);
          return params;
        },
        { preventScrollReset: true }
      );
    }
  };

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
            placeholder="Search..."
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
