import { Alert, Typography } from '@mui/material';

export const InputErrorAlert = ({ message }: { message: string }) => {
  return (
    <Alert
      variant="outlined"
      severity="error"
      sx={{ py: 0, px: 1, mt: 1, borderRadius: 1 }}
    >
      <Typography variant="caption">{message}</Typography>
    </Alert>
  );
};
