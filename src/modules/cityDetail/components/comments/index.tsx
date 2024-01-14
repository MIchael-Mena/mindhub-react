import { Box, Button, List, ListItem, TextField, Tooltip } from '@mui/material';
import { Comment } from '../../../../models/Comment';
import { useRef, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { CardComment } from '../card-comment';
import { createComment } from '../../../../store/actions/itinerary-extra';

type CommentsProps = {
  comments: Comment[];
  itineraryId: string;
};

export const Comments = forwardRef<HTMLDivElement, CommentsProps>(
  ({ comments, itineraryId }, refForward) => {
    const isLogged = useAppSelector((store) => store.userReducer.isLogged);
    const userId = useAppSelector((store) => store.userReducer.user._id);
    const dispatch = useAppDispatch();
    console.log('Comments');

    const textFieldRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
      const commentToPost = {
        text: textFieldRef.current!.value,
        onModel: 'Itinerary',
        _reference: itineraryId,
        _user: userId!,
      };
      dispatch(createComment(commentToPost));
      // if (!textFieldRef.current?.value) return;
      // console.log(textFieldRef.current?.value);
    };

    return (
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
                {/*               <TextField
                // label="Comment"
                inputRef={textFieldRef}
                multiline
                rows={4}
                placeholder="Write a comment..."
                variant="outlined"
                inputProps={{ maxLength: 500 }}
                fullWidth
              /> */}
                <Tooltip
                  title={isLogged ? '' : 'You must be logged in to comment'}
                  placement="top"
                >
                  <Box sx={{ mt: 1, alignSelf: 'flex-end' }}>
                    <Button
                      onClick={handleSubmit}
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
    );
  }
);

const messages: readonly Comment[] = [
  {
    _id: '1',
    text: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/1.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '2',
    text: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/2.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '3',
    text: 'I am try out this new BBQ recipe, I think this might be amazing',
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/3.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '4',
    text: 'I have the tickets to the ReactConf for this year.',
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/4.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '5',
    text: 'My appointment for the doctor was rescheduled for next Saturday.',
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/5.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '6',
    text: 'How about meeting tomorrow at 9pm?',
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/6.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
  {
    _id: '7',
    text: 'How about meeting tomorrow at 9pm?',
    _user: {
      firstName: 'Chelsea',
      lastName: 'Doe',
      profilePic: '/static/images/avatar/7.jpg',
    },
    _reference: '2', // Seria el id del itinerario
    onModel: 'Itinerary',
    createdAt: '2021-10-10T00:00:00.000Z',
    updatedAt: '2021-10-10T00:00:00.000Z',
  },
];
