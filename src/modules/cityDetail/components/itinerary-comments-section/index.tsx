import { Box, List } from '@mui/material';
import { forwardRef } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { ButtonLoadMore } from '../button-load-more';
import { CommentsList } from '../comments-list';
import { CommentCountDisplay } from '../comment-count-display';
import { CommentInputForm } from '../comment-input-form';

type CommentsProps = {
  itineraryId: string;
};

export const ItineraryCommentsSection = forwardRef<
  HTMLDivElement,
  CommentsProps
>(({ itineraryId }, refForward) => {
  const isLogged = useAppSelector((store) => store.userReducer.isLogged);
  const userId = useAppSelector((store) => store.userReducer.user._id);
  return (
    <>
      <CommentCountDisplay />
      <Box sx={{ overflowY: 'auto' }} py={2} ref={refForward}>
        <List disablePadding>
          <CommentsList isLogged={isLogged} userId={userId!} />
          <ButtonLoadMore />
          <CommentInputForm
            isLogged={isLogged}
            userId={userId!}
            itineraryId={itineraryId}
          />
        </List>
      </Box>
    </>
  );
});
