import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Comment } from '../../../../models/Comment';
import { stringAvatar } from '../../../../utils/util';
import React from 'react';

type CommentsProps = {
  // ref: React.RefObject<HTMLDivElement>;
  props?: any;
};

export const Comments = React.forwardRef<HTMLDivElement, CommentsProps>(
  ({ props }, refForward) => {
    return (
      <Box sx={{ overflowY: 'auto' }} ref={refForward}>
        <List>
          {messages.map(({ _id, text, _user, updatedAt }) => (
            <ListItem key={_id}>
              <ListItemAvatar>
                {!_user.profilePic ? (
                  <Avatar
                    alt={_user.firstName + ' ' + _user.lastName}
                    src={_user.profilePic}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(_user.firstName + ' ' + _user.lastName)}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={text}
                secondary={
                  <Typography variant="body2" color="GrayText">
                    {new Date(updatedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </Typography>
                }
              />
            </ListItem>
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
              <TextField
                // label="Comment"
                multiline
                rows={4}
                placeholder="Write a comment..."
                variant="outlined"
                inputProps={{ maxLength: 500 }}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 1, alignSelf: 'flex-end' }}
              >
                Send
              </Button>
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
