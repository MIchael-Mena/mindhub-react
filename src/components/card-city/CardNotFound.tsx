import { Alert, Card } from '@mui/material';

export const CardNotFound = ({ message }: { message?: string }) => {
  const notFoundImage = '../src/assets/images/city-not-found.png';
  const defaultMessage = 'No cities found';

  return (
    <>
      <Card
        sx={{ p: 2, m: 2, maxWidth: '300px', height: 'auto', borderRadius: 5 }}
      >
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>{message || defaultMessage}</strong>
        </Alert>
        <img
          src={notFoundImage}
          alt="not found"
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Card>
    </>
  );
};
