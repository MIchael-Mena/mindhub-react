import { Button, Menu, MenuItem, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { useState } from 'react';

interface SortButtonProps {
  currentSort: string;
  sortsAvailable: { [key: string]: string };
  onSortSelected: (sort: string) => void;
}

export const SortButton = ({
  currentSort,
  sortsAvailable,
  onSortSelected,
}: SortButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (sort: string) => {
    setAnchorEl(null);
    onSortSelected(sort);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        startIcon={<SortIcon />}
      >
        {currentSort || 'Sort'}
      </Button>
      <Menu
        id="sort-menu-comments"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(sortsAvailable).map((sort) => (
          <MenuItem key={sort} onClick={() => handleSort(sort)}>
            <Typography color={currentSort === sort ? 'primary' : 'inherit'}>
              {sort}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
