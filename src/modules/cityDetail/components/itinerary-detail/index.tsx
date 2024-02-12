import { Box, Grid, Typography } from '@mui/material';
import { Itinerary } from '../../../../models/Itinerary';
import {
  TimerSharp,
  AirplaneTicketOutlined,
  AirplaneTicketRounded,
} from '@mui/icons-material';
import { ItineraryLike } from '../itinerary-like';
import { UserAvatar } from '../../../shared/components/user-avatar';

export const ItineraryDetail = ({
  _id,
  duration,
  // likes,
  price,
  hashtags,
  user,
}: Itinerary) => {
  const userName = `${user.firstName} ${user.lastName}`;

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
            <UserAvatar
              imageUrl={user.profilePic}
              username={userName}
              tooltipPlacement="top"
            />
          </Box>

          <Box display="flex" alignItems="center" flexDirection="row">
            <ItineraryLike idItinerary={_id} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          display="flex"
          flexDirection="row"
          flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
          gap={{ xs: 1, lg: 2 }}
          alignItems="center"
          justifyContent="space-evenly"
          p={{ xs: 1, lg: 2 }}
          mb={{ xs: 1, lg: 0 }}
        >
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Duration:
            </Typography>
            <Box display="inline-flex" alignItems="self-start" minHeight="24px">
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
            <Box minHeight="24px" display="inline-flex" alignItems="self-start">
              {Array.from(Array(price), (_, i) => (
                <AirplaneTicketRounded key={i} fontSize="small" />
              ))}
              {Array.from(Array(5 - price), (_, i) => (
                <AirplaneTicketOutlined key={i} fontSize="small" />
              ))}
            </Box>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              Tags:
            </Typography>
            <Box minHeight="24px" display="inline-flex" alignItems="self-start">
              {hashtags.map((hashtag, key) => (
                <Typography variant="caption" key={key}>
                  {'#' + hashtag + ' '}
                </Typography>
              ))}
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
