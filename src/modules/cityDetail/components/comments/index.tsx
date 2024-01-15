import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRef, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { CardComment } from '../card-comment';
import { createComment } from '../../../../store/actions/itinerary-extra';

type CommentsProps = {
  itineraryId: string;
};

export const Comments = forwardRef<HTMLDivElement, CommentsProps>(
  ({ itineraryId }, refForward) => {
    const comments = useAppSelector(
      (store) => store.itineraryExtraReducer.data.comments
    );
    const isLogged = useAppSelector((store) => store.userReducer.isLogged);
    const userId = useAppSelector((store) => store.userReducer.user._id);
    const dispatch = useAppDispatch();
    console.log('Comments');

    const textFieldRef = useRef<HTMLInputElement>(null);

    const handleCommentPost = () => {
      const commentToPost = {
        text: textFieldRef.current!.value,
        onModel: 'Itinerary',
        _reference: itineraryId,
        _user: userId!,
      };
      dispatch(createComment(commentToPost)).then((e) => {
        if (e.meta.requestStatus === 'fulfilled') {
          textFieldRef.current!.value = '';
        }
      });
    };

    return (
      <>
        <Typography variant="h5" p={2} bgcolor="secondary.main">
          Comments
        </Typography>
        <Box sx={{ overflowY: 'auto' }} py={2} ref={refForward}>
          <List disablePadding>
            {comments.map((comment) => (
              <CardComment
                isLogged={isLogged}
                key={comment._id}
                {...comment}
                userId={userId!}
              />
            ))}
            <ListItem>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box display="flex" width="100%" gap={1}>
                  <TextField
                    fullWidth
                    inputRef={textFieldRef}
                    placeholder="Write a comment..."
                    variant="filled"
                    multiline
                    inputProps={{ maxLength: 500 }}
                  />
                  <Tooltip
                    title={isLogged ? '' : 'You must be logged in to comment'}
                    placement="top"
                  >
                    <Box sx={{ mt: 1, alignSelf: 'flex-end' }}>
                      <Button
                        onClick={handleCommentPost}
                        disabled={!isLogged}
                        variant="contained"
                        color="primary"
                      >
                        Post
                      </Button>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>
      </>
    );
  }
);
