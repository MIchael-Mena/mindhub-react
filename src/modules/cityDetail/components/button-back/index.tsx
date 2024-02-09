import { DoubleArrow } from '@mui/icons-material';
import { Box, Fab, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useIsInView from '../../../../hooks/useIsInView';

interface ButtonBackProps {}

export const ButtonBack = ({}: ButtonBackProps) => {
  const navigate = useNavigate();
  const [ref, isInViewport] = useIsInView(1);

  return (
    <>
      <Fab
        ref={ref}
        variant="extended"
        color="secondary"
        size="small"
        onClick={() => {
          navigate(-1);
        }}
        sx={{
          height: 40,
          borderRadius: 25,
          position: 'absolute',
          top: -24,
          left: 20,
        }}
      >
        <DoubleArrow sx={{ transform: 'rotate(180deg)' }} />
        Go Back
      </Fab>
      <Fade in={!isInViewport} timeout={500}>
        {/* Agrego el div ya que Fade aplica un efecto de transition distinto al del Fab */}
        <div>
          <Fab
            disableTouchRipple // El ripple no se ve bien en el hover
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              position: 'fixed',
              top: '50%',
              right: { xs: 5, sm: 20, xl: '15%' },
              zIndex: 1000,
              height: 40,
              minWidth: 40,
              width: 'auto',
              borderRadius: 25,
              opacity: { xs: 0.8, lg: 1 },
              '& span ': {},
              '&:hover, &:focus': {
                px: 1,
                opacity: 1,
                '& span:first-of-type': {
                  width: '60px', // Si le doy 100% no funciona la animación
                },
              },
            }}
          >
            <DoubleArrow
              sx={{
                transform: 'rotate(180deg)',
                // left: 0,
              }}
            />
            <Box
              component="span"
              sx={{
                transition: 'all 0.5s ease-in-out',
                overflow: 'hidden',
                width: 0,
                textTransform: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Go Back
            </Box>
          </Fab>
        </div>
      </Fade>
    </>
  );
};
