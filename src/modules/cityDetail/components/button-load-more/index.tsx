import { Button, ListItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchCommentsWithValidation } from '../../../../store/actions/itinerary-extra';

export const ButtonLoadMore = () => {
  const dispatch = useAppDispatch();

  const { page: currentPage, totalPages } = useAppSelector(
    (store) => store.itineraryExtraReducer.data.commentParams
  );

  const handleLoadMore = () => {
    dispatch(
      fetchCommentsWithValidation({ page: currentPage + 1, append: true })
    );
  };

  return (
    <>
      {currentPage < totalPages && (
        <ListItem sx={{ display: 'inline-block', textAlign: 'center' }}>
          <Button
            variant="text"
            sx={{ borderRadius: 5, px: 2 }}
            onClick={handleLoadMore}
            endIcon={<ArrowDropDownIcon />}
          >
            Load more
          </Button>
        </ListItem>
      )}
    </>
  );
};
