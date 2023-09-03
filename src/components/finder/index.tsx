import React, { useEffect, useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import './Finder.css';

const Finder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(searchParam);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery === searchParam) return; // si no hay cambios, no hago nada
    if (!searchQuery) {
      queryParams.delete('search');
    } else {
      queryParams.set('search', searchQuery);
    }

    navigate(
      { search: queryParams.toString() }, // navigate por default a la misma ruta pero con los nuevos queryParams
      {
        preventScrollReset: true,
        state: { from: 'finder' },
      }
    );
  };

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

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
