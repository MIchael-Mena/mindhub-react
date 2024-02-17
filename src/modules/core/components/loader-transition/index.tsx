import { Box, Typography, useTheme } from '@mui/material';
import { Eclipse, ThreeDotsScale } from 'react-svg-spinners';

const LoaderTransition = () => {
  const theme = useTheme();
  return (
    <>
      <Box position="relative" minHeight="100%" width="100%">
        <Box
          position="absolute"
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Eclipse width="300px" height="300px" color={theme.palette.divider} />

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'inline-flex',
            }}
          >
            <Typography variant="h3" color="text.primary">
              Loading
            </Typography>
            <Box component="span" ml={1}>
              <ThreeDotsScale
                width="50px"
                height="50px"
                color={theme.palette.text.primary}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoaderTransition;
