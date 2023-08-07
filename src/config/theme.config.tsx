import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

type ThemeProp = {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#37306B',
      paper: '#66347F',
    },
    primary: {
      main: '#D27685',
      dark: '#722265',
    },
    secondary: {
      main: '#9E4784',
      dark: '#722265',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        style: {
          textTransform: 'none',
          // borderRadius: '0.7rem',
        },
      },
      variants: [
        {
          props: { variant: 'text' },
          style: {
            color: '#fff',
            borderRadius: '0',
            ':hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            color: '#fff',
            borderRadius: '0.7rem',
          },
        },
      ],
    },
  },
})

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
