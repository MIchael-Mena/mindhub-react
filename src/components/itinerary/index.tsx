import { Avatar, Box, Typography } from '@mui/material';
import { Itinerary } from '../../models/Itinerary';
import { stringAvatar } from '../../utils/util';
import {
  TimerSharp,
  AirplaneTicketOutlined,
  AirplaneTicketRounded,
} from '@mui/icons-material';
import { ItineraryLike } from '../itinerary-like';

export const ItineraryDetail = ({
  duration,
  likes,
  price,
  hashtags,
  user,
}: Itinerary) => {
  const userNames = `${user.name} ${user.surname}`;

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap={{ xs: 'wrap', md: 'nowrap' }}
      gap={{ xs: 6, md: 2 }}
      justifyContent={{ xs: 'start', md: 'space-evenly' }}
      alignItems="baseline"
      height="100%"
      p={2}
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <Typography variant="subtitle1" gutterBottom>
          Published by:
        </Typography>
        {user.profilePic ? (
          <Avatar alt={userNames} src={user.profilePic} />
        ) : (
          <Avatar {...stringAvatar(userNames)} />
        )}
      </Box>

      <ItineraryLike likes={likes} />

      <div>
        <Typography variant="subtitle1" gutterBottom>
          Duration:
        </Typography>
        <Box display="flex" alignItems="center">
          <TimerSharp />
          <Typography variant="body1" mx={1}>
            {duration / 60} hours
          </Typography>
        </Box>
      </div>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Price:
        </Typography>
        {Array.from(Array(price), (_, i) => (
          <AirplaneTicketRounded key={i} fontSize="small" />
        ))}
        {Array.from(Array(5 - price), (_, i) => (
          <AirplaneTicketOutlined key={i} fontSize="small" />
        ))}
      </Box>

      <div>
        <Typography variant="subtitle1" gutterBottom>
          Tags:
        </Typography>
        {hashtags.map((hashtag, key) => (
          <Typography variant="caption" key={key}>
            {'#' + hashtag + ' '}
          </Typography>
        ))}
      </div>
    </Box>
  );
};
