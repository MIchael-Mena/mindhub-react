import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
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
    <>
      <Grid container height="100%" width="100%" component="section">
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          flexDirection={{ xs: 'row', md: 'column' }}
          justifyContent="space-evenly"
          alignItems="center"
          borderRight={{ xs: 0, md: 1 }}
          borderBottom={{ xs: 1, md: 0 }}
          borderColor="divider"
          py={2}
          mb={0}
          maxHeight={{ xs: '40%', md: '100%' }}
        >
          <Box display="flex" alignItems="center" flexDirection="row">
            <Typography variant="subtitle1" gutterBottom mx={1}>
              By:
            </Typography>
            <Tooltip title={userNames} placement="top" arrow>
              {user.profilePic ? (
                <Avatar alt={userNames} src={user.profilePic} />
              ) : (
                <Avatar {...stringAvatar(userNames)} />
              )}
            </Tooltip>
          </Box>

          <Box display="flex" alignItems="center" flexDirection="row">
            <ItineraryLike likes={likes} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          display="flex"
          flexDirection="row"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap={{ xs: 1, md: 2 }}
          alignItems="center"
          justifyContent="space-evenly"
          // height="100%"
          p={{ xs: 1, md: 2 }}
          mb={{ xs: 1, md: 0 }}
        >
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

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Price:
            </Typography>
            {Array.from(Array(price), (_, i) => (
              <AirplaneTicketRounded key={i} fontSize="small" />
            ))}
            {Array.from(Array(5 - price), (_, i) => (
              <AirplaneTicketOutlined key={i} fontSize="small" />
            ))}
          </div>

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
        </Grid>
      </Grid>
    </>
  );
};
