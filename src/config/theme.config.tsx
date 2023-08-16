import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

type ThemeProp = {
  children: React.ReactNode
}

const defaultTheme = createTheme()
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
    fontFamily: 'Aleo, serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.20rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
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
    MuiContainer: {
      styleOverrides: {
        root: {
          [defaultTheme.breakpoints.up('md')]: {
            paddingInline: defaultTheme.spacing(10),
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color: '#a7a7a7',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#fff',
            // fontWeight: 500,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        style: {
          textTransform: 'none',
          // borderRadius: '0.7rem',
        },
      },
      styleOverrides: {
        root: {
          '&:active': {
            outline: '2px solid #fff;',
          },
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
        {
          props: { variant: 'outlined' },
          style: {
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
