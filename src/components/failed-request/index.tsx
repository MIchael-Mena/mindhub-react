import { Alert, AlertTitle, Box } from '@mui/material';

export const FailedRequest = ({
  message,
  width = '400px',
}: {
  message?: string;
  width?: string;
}) => {
  const defaultMessage = 'Oops! Something went wrong.';
  return (
    <>
      <Box
        boxShadow={5}
        sx={{
          borderRadius: '15px',
          overflow: 'hidden',
          height: 'auto',
          maxWidth: width,
        }}
      >
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          <AlertTitle>
            <strong>{message || defaultMessage}</strong>
            <hr />
            <strong>Please try again later.</strong>
          </AlertTitle>
        </Alert>
        <img
          src="src/assets/images/404.jpg"
          alt="404"
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
    </>
  );
};
