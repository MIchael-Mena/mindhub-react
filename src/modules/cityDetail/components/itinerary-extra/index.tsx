import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import {
  Avatar,
  Box,
  Collapse,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Comment } from '../../../../models/Comment';
import { ActivityCard } from '../activity-card';
import { Activity } from '../../../../models/Acitivity';

export const ItineraryExtra = () => {
  const [show, setShow] = useState(false);
  const animationDuration = 500;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        sx={{
          mx: 'auto',
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.4s ease-in-out',
        }}
        size="small"
        onClick={handleShow}
      >
        <ExpandCircleDownIcon
          fontSize="medium"
          sx={{
            transform: show ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        />
        {!show ? 'View more' : 'View less'}
      </Fab>

      <div>
        <Collapse in={show} timeout={animationDuration} unmountOnExit>
          <Grid
            container
            sx={{
              minHeight: '400px',
              bgcolor: 'background.paper',
              borderRadius: 3,
              borderTop: 3,
              borderColor: 'divider',
              boxShadow: 4,
              overflow: 'hidden',
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                p={2}
                bgcolor="secondary.main"
                color="white"
              >
                Activities
              </Typography>
              {activities.map((activity) => (
                <ActivityCard key={activity._id} {...activity} />
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              boxShadow={2}
              sx={{ overflowY: 'auto', maxHeight: '400px' }}
            >
              <Typography variant="h5" p={2} bgcolor="secondary.main">
                Comments
              </Typography>
              <List>
                {messages.map(({ _id, text, _user }) => (
                  <ListItem key={_id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={_user.firstName + ' ' + _user.lastName}
                        src={_user.profilePic}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Collapse>
      </div>
    </>
  );
};

const activities: Activity[] = [
  {
    _id: '1',
    _itinerary: '1',
    title: 'Activity 1',
    duration: 60,
    description: 'Description of Activity 1',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '2',
    _itinerary: '1',
    title: 'Activity 2',
    duration: 60,
    description: 'Description of Activity 2',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '3',
    _itinerary: '1',
    title: 'Activity 3',
    duration: 60,
    description: 'Description of Activity 3',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '4',
    _itinerary: '1',
    title: 'Activity 4',
    duration: 60,
    description: 'Description of Activity 4',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '5',
    _itinerary: '1',
    title: 'Activity 5',
    duration: 60,
    description: 'Description of Activity 5',
    images: ['image1.jpg', 'image2.jpg'],
  },
  /*   {
    _id: '6',
    _itinerary: '1',
    title: 'Activity 6',
    duration: 60,
    description: 'Description of Activity 6',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '7',
    _itinerary: '1',
    title: 'Activity 7',
    duration: 60,
    description: 'Description of Activity 7',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '8',
    _itinerary: '1',
    title: 'Activity 8',
    duration: 60,
    description: 'Description of Activity 8',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '9',
    _itinerary: '1',
    title: 'Activity 9',
    duration: 60,
    description: 'Description of Activity 9',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    _id: '10',
    _itinerary: '1',
    title: 'Activity 10',
    duration: 60,
    description: 'Description of Activity 10',
    images: ['image1.jpg', 'image2.jpg'],
  }, */
];

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
