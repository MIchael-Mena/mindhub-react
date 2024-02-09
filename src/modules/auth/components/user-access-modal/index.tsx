import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import SignIn from '../sign-in';
import { SignUp } from '../sign-up';
import { ControlAuth } from '../control-auth';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 'auto',
  borderRadius: 5,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: 'secondary.main',
  boxShadow: 24,
  overflow: 'hidden',
};

export default function UserAccesssModal() {
  const animationDuration = 500;
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = (
    _event?: {},
    _reason?: 'backdropClick' | 'escapeKeyDown'
  ) => {
    // if (_reason && _reason == 'backdropClick') return; // Si se hace click en el backdrop, no se cierra el modal
    setOpen(false);
    setTimeout(() => {
      // Si el modal está abierto, establece showSignIn en true cada vez que se renderiza UserAccesssModal.
      setShowSignIn(true);
    }, animationDuration);
  };

  const toggleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <>
      <ControlAuth handleLoginOpen={handleOpen} />

      <Modal
        aria-labelledby="user-access-modal"
        aria-describedby="user-access-modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: animationDuration, // Duracion de la animacion del backdrop
          },
        }}
      >
        <Fade in={open} timeout={animationDuration}>
          <Box sx={style}>
            {showSignIn ? (
              <SignIn onSignUpClick={toggleComponent} onClose={handleClose} />
            ) : (
              <SignUp onSignInClick={toggleComponent} onClose={handleClose} />
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
