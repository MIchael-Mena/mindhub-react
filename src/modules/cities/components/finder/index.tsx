// import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { useSearchParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import useSearch from '../../hooks/useSearch';

const Finder = () => {
  const {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch,
  } = useSearch();

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Box
          tabIndex={0}
          sx={{
            background: '#fff',
            border: '3px solid',
            borderColor: (theme) => theme.palette.primary.dark,
            borderRadius: 5,
            padding: 1,
            boxShadow: (theme) =>
              `0px 0px 5px 0px ${theme.palette.primary.dark}`,
            transition: 'all 0.5s ease',
            '&:hover, &:focus-within': {
              // focus-within se aplica cuando el elemento o sus hijos tienen el foco
              borderRadius: '50px',
              borderColor: (theme) => theme.palette.primary.light,
              boxShadow: (theme) =>
                `0px 0px 5px 0px ${theme.palette.primary.light}`,
            },
          }}
        >
          <IconButton
            onClick={handleClearSearch}
            sx={{
              left: 0,
              width: searchQuery ? 35 : 0,
              padding: 1,
              color: 'secondary',
              opacity: searchQuery ? 1 : 0,
              visibility: searchQuery ? 'visible' : 'hidden',
              transition: 'all 0.3s ease-in-out',
            }}
            color="secondary"
          >
            <ClearIcon />
          </IconButton>
          <InputBase
            id="finder"
            autoComplete="off"
            placeholder="Find your city"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              marginLeft: 1,
              flex: 1,
              color: 'black',
            }}
          />
          <IconButton type="submit" sx={{ padding: 1 }} color="secondary">
            <SearchIcon />
          </IconButton>
        </Box>
      </form>
    </>
  );
};

export default Finder;
