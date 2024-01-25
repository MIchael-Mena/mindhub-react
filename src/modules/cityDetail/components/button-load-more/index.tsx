import { Button, ListItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchMoreComments } from '../../../../store/actions/itinerary-extra';

export const ButtonLoadMore = () => {
  const dispatch = useAppDispatch();

  const { currentPage, totalPages } = useAppSelector(
    (store) => store.itineraryExtraReducer.data.commentParams
  );

  const handleLoadMore = () => {
    dispatch(fetchMoreComments());
  };

  return (
    <>
      {currentPage < totalPages && (
        <ListItem sx={{ display: 'inline-block', textAlign: 'center' }}>
          <Button
            variant="text"
            sx={{ borderRadius: 5, pl: 2 }}
            onClick={handleLoadMore}
          >
            Load more
            <ArrowDropDownIcon />
          </Button>
        </ListItem>
      )}
    </>
  );
};
