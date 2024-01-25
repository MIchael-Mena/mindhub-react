import { Typography } from '@mui/material';
import { useAppSelector } from '../../../../store/hooks';

export const CommentCountDisplay = () => {
  const totalComments = useAppSelector(
    (store) => store.itineraryExtraReducer.data.commentParams.totalCount
  );
  return (
    <Typography variant="h5" p={2} bgcolor="secondary.main">
      Comments ({totalComments})
    </Typography>
  );
};
