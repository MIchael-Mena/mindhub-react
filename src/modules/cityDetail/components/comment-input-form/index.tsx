import { Box, Button, ListItem, TextField, Tooltip } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useRef } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { createComment } from '../../../../store/actions/itinerary-extra';
import { ApiResponse } from '../../../../models/ApiResponse';

export const CommentInputForm = ({
  itineraryId,
  isLogged,
  userId,
}: {
  itineraryId: string;
  isLogged: boolean;
  userId: string;
}) => {
  const dispatch = useAppDispatch();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleCommentPost = () => {
    if (textFieldRef.current && !textFieldRef.current.value) {
      enqueueSnackbar('Comment can not be empty', {
        variant: 'warning',
      });
      return;
    }
    const commentToPost = {
      text: textFieldRef.current!.value,
      onModel: 'Itinerary',
      _reference: itineraryId,
      _user: userId!,
    };
    dispatch(createComment(commentToPost)).then((e) => {
      if (e.meta.requestStatus === 'fulfilled') {
        textFieldRef.current!.value = '';
      } /* else if (e.meta.requestStatus === 'rejected' && e.payload) {
        const payload = e.payload as ApiResponse<undefined>;
        enqueueSnackbar(payload.message, {
          variant: 'error',
        });
      } */
    });
  };
  return (
    <>
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
              id="comment"
              name="comment"
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
              <Box sx={{ alignSelf: 'center' }}>
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
    </>
  );
};
