import { Box, SvgIcon, Theme, Typography, useMediaQuery } from '@mui/material';
import { ReactComponent as MyTineraryIcon } from '../../../../assets/icons/logo-tinerary.svg';
import { Variant } from '@mui/material/styles/createTypography';
import { useNavigate } from 'react-router-dom';
import './logo.css';

interface logoProps {
  isVisibleInXs?: boolean;
  isVisibleInSm?: boolean;
  size?: 'small' | 'medium' | 'large';
  sizeXs?: 'small' | 'medium' | 'large';
  sizeSm?: 'small' | 'medium' | 'large';
  link?: string;
  animation?: boolean;
}

const logoSize = (size: string) => {
  switch (size) {
    case 'small':
      return {
        textSize: 'h5',
        iconSize: '50px',
      };
    case 'medium':
      return {
        textSize: 'h3',
        iconSize: '100px',
      };
    case 'large':
      return {
        textSize: 'h2',
        iconSize: '150px',
      };
    default:
      return {
        textSize: 'h5',
        iconSize: 'auto',
      };
  }
};

const Logo = ({
  isVisibleInXs = true,
  isVisibleInSm = true,
  size,
  sizeXs = 'small',
  sizeSm = 'medium',
  link,
  animation = false,
}: logoProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const navigate = useNavigate();
  const { textSize, iconSize } = logoSize(
    size || (isSmallScreen ? sizeXs : sizeSm)
  );

  return (
    <Box
      id="logo"
      sx={{
        display: {
          xs: isVisibleInXs ? 'inline-flex' : 'none',
          sm: isVisibleInSm ? 'inline-flex' : 'none',
        },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
        cursor: link ? 'pointer' : 'default',
      }}
      onClick={() => link && navigate(link)}
    >
      <SvgIcon
        component={MyTineraryIcon}
        inheritViewBox
        sx={{ width: 'auto', height: iconSize }}
      />
      <Typography
        // className="logo-text sparkle u-hover--sparkle"
        className={'logo-text' + (animation ? ' sparkle u-hover--sparkle' : '')}
        component="div"
        variant={textSize as Variant}
      >
        My Tinerary
      </Typography>
    </Box>
  );
};

export default Logo;
