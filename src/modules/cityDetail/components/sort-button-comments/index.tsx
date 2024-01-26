import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { useAppDispatch } from '../../../../store/hooks';
import { fetchComments } from '../../../../store/actions/itinerary-extra';

// const sortsAvailable = ['Most recent', 'Most old'];
const sortsAvailable: { [key: string]: 'asc' | 'desc' } = {
  'Most recent': 'desc',
  'Most old': 'asc',
};

export default function SortButtonComments() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortType, setSortType] = useState('');

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (selectedSortType: string) => {
    // console.log(`Sorting by ${selectedSortType}`);
    setSortType(selectedSortType);
    setAnchorEl(null);
    dispatch(
      fetchComments({ order: sortsAvailable[selectedSortType], page: 1 })
    );
  };

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        startIcon={<SortIcon />}
      >
        {sortType || 'Sort'}
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
            <Typography color={sortType === sort ? 'primary' : 'inherit'}>
              {sort}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
