import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import './Finder.css';
// import { useAppDispatch } from '../../../../store/hooks';
// import { fetchCities } from '../../../../store/actions/cities';

const Finder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(searchParam);

  // const pageParam = new URLSearchParams(location.search).get('page') || 1;
  // const dispatch = useAppDispatch();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Vuelve a renderizar el componente, y me garantiza que el valor de searchQuery sea el ultimo
    setSearchQuery(event.target.value);
  };

  // const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (searchQuery === searchParam) return; // si no hay cambios, no hago nada
  //   if (!searchQuery) {
  //     setSearchParams(
  //       (params: URLSearchParams) => {
  //         params.delete('search');
  //         return params;
  //       },
  //       { preventScrollReset: true }
  //     );
  //     dispatch(fetchCities({ page: pageParam }));
  //   } else {
  //     setSearchParams(
  //       (params: URLSearchParams) => {
  //         params.set('search', searchQuery);
  //         return params;
  //       },
  //       { preventScrollReset: true }
  //     );
  //     dispatch(fetchCities({ search: searchQuery, page: pageParam }));
  //   }
  // };

  // useEffect(() => {
  //   dispatch(fetchCities({ search: searchParam, page: pageParam }));
  // }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery === searchParam) return; // si no hay cambios, no hago nada
    if (!searchQuery) {
      setSearchParams(
        (params: URLSearchParams) => {
          params.delete('search');
          return params;
        },
        { preventScrollReset: true }
      );
    } else {
      setSearchParams(
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSearchSubmit}>
          <Box
            sx={{
              boxSizing: 'content-box',
              display: 'flex',
              alignItems: 'center',
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
            <IconButton
              type="submit"
              sx={{ padding: '10px' }}
              color="secondary"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Finder;
