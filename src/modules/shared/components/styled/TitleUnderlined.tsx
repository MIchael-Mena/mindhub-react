import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

const TitleUnderlined = styled(Box)<BoxProps>(({}) => ({
  borderBottom: '3px solid #ccc',
  borderEndEndRadius: 35,
  borderEndStartRadius: 10,
}));

export default TitleUnderlined;
