import { useMemo } from 'react'
import { Theme, useTheme } from '@mui/material'

const useStyles = () => {
  const theme: Theme = useTheme()
  return useMemo(() => {
    return {
      navLinkActive: {
        color: theme.palette.primary.main,
      },
      shadowBoxGreen: {
        ':hover': {
          boxShadow: '0 0 3px 1px #579e57',
        },
      },
      containerBreakpoints: {
        px: { xs: 0, sm: 5, md: 10 },
        maxWidth: 'lg',
      },
    }
  }, [theme])
}

export default useStyles
