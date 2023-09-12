import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import UserIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import SignIn from '../sign-in';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 350,
  borderRadius: 5,
  bgcolor: 'background.paper',
  border: '2px solid',
  // borderLeft: '2px solid',
  // borderBottom: '2px solid',
  borderColor: 'secondary.main',
  boxShadow: 24,
  p: 4,
};

export default function UserAccesssModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 1 }}
        onClick={handleOpen}
      >
        <UserIcon sx={{ mr: 1 }} />
        Login
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <SignIn />
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
