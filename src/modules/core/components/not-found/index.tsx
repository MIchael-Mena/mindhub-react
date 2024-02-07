import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
  fontWeight: 'bold',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.MuiTypography-h1': {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    transition: 'text-shadow 0.3s ease-in-out',
    '&:hover': {
      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)',
    },
  },
}));

export default function NotFound() {
  return (
    <StyledContainer>
      <StyledTypography variant="h1" fontSize="10rem">
        404
      </StyledTypography>
      <StyledTypography variant="h5">Page not found</StyledTypography>
    </StyledContainer>
  );
}
