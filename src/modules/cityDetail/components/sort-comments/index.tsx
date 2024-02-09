import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchComments } from '../../../../store/actions/itinerary-extra';
import { SortButton } from '../../../shared/components/sort-button';

const sortsAvailable: { [key: string]: 'asc' | 'desc' } = {
  'Most recent': 'desc',
  'Most old': 'asc',
};

export default function SortComments() {
  const initialSortValue = 'Most recent';
  const dispatch = useAppDispatch();
  const tinerraryId = useAppSelector(
    (state) => state.itineraryExtraReducer.data.itineraryId
  );

  const [sortType, setSortType] = useState(initialSortValue);

  const handleSort = (selectedSort: string) => {
    setSortType(selectedSort);
    dispatch(fetchComments({ order: sortsAvailable[selectedSort], page: 1 }));
  };

  useEffect(() => {
    setSortType(initialSortValue);
  }, [tinerraryId]);

  return (
    <SortButton
      currentSort={sortType}
      sortsAvailable={sortsAvailable}
      onSortSelected={handleSort}
    />
  );
}

/* export default function SortComments() {
  const initialSortValue = '';
  const dispatch = useAppDispatch();
  const tinerraryId = useAppSelector(
    (state) => state.itineraryExtraReducer.data.itineraryId
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortType, setSortType] = useState(initialSortValue);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (selectedSortType: string) => {
    setAnchorEl(null);
    setSortType(selectedSortType);
    dispatch(
      fetchComments({ order: sortsAvailable[selectedSortType], page: 1 })
    );
  };

  useEffect(() => {
    setSortType(initialSortValue);
  }, [tinerraryId]);

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
} */
