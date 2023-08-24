import { useParams } from 'react-router-dom';
import { useApiService } from '../hooks/useApiService';
import { ApiService } from '../services/api.service';
import { City } from '../models/City';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Fab,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { FailedRequest } from '../components/failed-request';
import { useNavigate } from 'react-router-dom';
import {
  DoubleArrow,
  LabelImportantTwoTone,
  FlagCircleOutlined,
  LanguageTwoTone,
  MonetizationOnTwoTone,
  AccessTimeTwoTone,
  PlaceTwoTone,
  // LabelTwoTone,
  // LuggageOutlined,
} from '@mui/icons-material';

const CityDetail = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const {
    data: city,
    loading,
    error,
  } = useApiService<City>(() => ApiService.getData(`/city/${id}`));

  const informationAttributes = [
    {
      icon: <LabelImportantTwoTone color="secondary" />,
      label: `Best time to visit: ${city.bestTime}`,
    },
    {
      icon: <MonetizationOnTwoTone color="secondary" />,
      label: `Currency: ${city.currency}`,
    },
    {
      icon: <LanguageTwoTone color="secondary" />,
      label: `Language: ${city.language}`,
    },
    {
      icon: <AccessTimeTwoTone color="secondary" />,
      label: `Timezone: ${city.timezone}`,
    },
  ];

  return (
    <Container disableGutters maxWidth="lg" sx={{ alignSelf: 'center' }}>
      <Paper
        elevation={5}
        sx={{ mt: 4, mb: 2, p: 4, position: 'relative', borderRadius: 5 }}
      >
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          onClick={() => Navigate(-1)}
          sx={{ borderRadius: 15, position: 'absolute', top: -24, left: 20 }}
        >
          <DoubleArrow sx={{ mr: 1, transform: 'rotate(180deg)' }} />
          Go Back
        </Fab>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <FailedRequest width="290px" />
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={6}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-evenly'}
              >
                <Box
                  display="inline-flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    display="inline-flex"
                    gap={1}
                    sx={{
                      borderBottom: '3px solid #ccc',
                      borderRadius: 5,
                      px: 2,
                    }}
                  >
                    <FlagCircleOutlined color="primary" fontSize="large" />
                    <Typography variant="h4" gutterBottom>
                      {city.country}
                    </Typography>
                  </Box>
                  <Box display="inline-flex" gap={1} alignItems="center">
                    <Fab variant="circular" color="primary" size="medium">
                      <PlaceTwoTone color="secondary" fontSize="large" />
                    </Fab>
                    <Typography variant="h5">{city.name}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" textAlign="center" my={3}>
                  {city.description}
                </Typography>
                <Box display="inline-flex" gap={1}>
                  <Typography variant="h5" gutterBottom>
                    Rating:
                  </Typography>
                  <Rating
                    name="customized-10"
                    defaultValue={(city.rating / 10) * 5}
                    max={5}
                    precision={0.5}
                    readOnly
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={city.images[0]}
                  alt={city.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 10,
                    border: '1px solid #ccc',
                    boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.3)',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <hr />
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    my: 4,
                    borderRadius: 3,
                  }}
                  variant="outlined"
                >
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    spacing={2}
                    justifyContent={'space-around'}
                    sx={{ mt: 1, mb: 1 }}
                  >
                    {informationAttributes.map((attribute, index) => (
                      <Chip
                        key={index}
                        variant="filled"
                        color="secondary"
                        icon={attribute.icon}
                        sx={{
                          transition: 'all 0.3s ease-in-out',
                          ':hover': {
                            // backgroundColor: '#f50057',
                            backgroundColor: (theme) =>
                              theme.palette.success.main,
                            boxShadow: 2,
                            transform: 'scale(1.05)',
                          },
                        }}
                        label={attribute.label}
                      />
                    ))}
                  </Stack>
                </Paper>
                <hr />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Itinerary under construction
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default CityDetail;
