import { DoubleArrow } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ButtonBackProps {}

export const ButtonBack = ({}: ButtonBackProps) => {
  const navigate = useNavigate();
  return (
    <Fab
      variant="extended"
      color="secondary"
      size="medium"
      onClick={() => {
        navigate(-1);
      }}
      sx={{ borderRadius: 15, position: 'absolute', top: -24, left: 20 }}
    >
      <DoubleArrow sx={{ mr: 1, transform: 'rotate(180deg)' }} />
      Go Back
    </Fab>
  );
};
