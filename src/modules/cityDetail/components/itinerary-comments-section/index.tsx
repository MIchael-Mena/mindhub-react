import { Box, List } from '@mui/material';
import { forwardRef } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { ButtonLoadMore } from '../button-load-more';
import { CommentsList } from '../comments-list';
import { CommentCountDisplay } from '../comment-count-display';
import { CommentInputForm } from '../comment-input-form';
import SortComments from '../sort-comments';

type CommentsProps = {
  itineraryId: string;
  titleHeightInPx?: string;
};

export const ItineraryCommentsSection = forwardRef<
  HTMLDivElement,
  CommentsProps
>(({ itineraryId, titleHeightInPx = '60px' }, refForward) => {
  const isLogged = useAppSelector((store) => store.userReducer.isLogged);
  const userId = useAppSelector((store) => store.userReducer.user._id);
  return (
    <>
      <Box
        px={2}
        height={titleHeightInPx}
        display="inline-flex"
        bgcolor="secondary.main"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <CommentCountDisplay />
        <SortComments />
      </Box>

      <Box sx={{ overflowY: 'auto' }} py={2} ref={refForward}>
        <List disablePadding>
          <CommentInputForm
            isLogged={isLogged}
            userId={userId!}
            itineraryId={itineraryId}
          />
          <CommentsList isLogged={isLogged} userId={userId!} />
          <ButtonLoadMore />
        </List>
      </Box>
    </>
  );
});
