import { Box, SvgIcon, Theme, Typography, useMediaQuery } from '@mui/material'
import { ReactComponent as MyTineraryIcon } from '../../assets/icons/logo-tinerary.svg'
import './Logo.css'
import { Variant } from '@mui/material/styles/createTypography'

interface logoProps {
  isVisibleInXs?: boolean
  isVisibleInSm?: boolean
  size?: 'small' | 'medium' | 'large'
  sizeXs?: 'small' | 'medium' | 'large'
  sizeSm?: 'small' | 'medium' | 'large'
}

const logoSize = (size: string) => {
  switch (size) {
    case 'small':
      return {
        textSize: 'h5',
        iconSize: '50px',
      }
    case 'medium':
      return {
        textSize: 'h3',
        iconSize: '100px',
      }
    case 'large':
      return {
        textSize: 'h2',
        iconSize: '150px',
      }
    default:
      return {
        textSize: 'h5',
        iconSize: 'auto',
      }
  }
}

const Logo = ({
  isVisibleInXs = true,
  isVisibleInSm = true,
  size,
  sizeXs = 'small',
  sizeSm = 'medium',
}: logoProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  )
  const { textSize, iconSize } = logoSize(
    size || (isSmallScreen ? sizeXs : sizeSm)
  )

  return (
    <Box
      sx={{
        display: {
          xs: isVisibleInXs ? 'inline-flex' : 'none',
          sm: isVisibleInSm ? 'inline-flex' : 'none',
        },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      <SvgIcon
        component={MyTineraryIcon}
        inheritViewBox
        // fontSize="large"
        sx={{ width: 'auto', height: iconSize }}
      />
      <Typography
        className="logo-text"
        component="div"
        variant={textSize as Variant}
      >
        My Tinerary
      </Typography>
    </Box>
  )
}

export default Logo
