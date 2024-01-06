import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Collapse, Fab } from '@mui/material';
import { useState } from 'react';

export const ItineraryExtra = () => {
  const [show, setShow] = useState(false);
  const animationDuration = 500;

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        sx={{
          mx: 'auto',
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'opacity 0.4s ease-in-out',
        }}
        size="small"
        onClick={handleShow}
      >
        <ExpandCircleDownIcon
          fontSize="medium"
          sx={{
            transform: show ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: `transform ${animationDuration}ms ease-in-out`,
          }}
        />
        {!show ? 'View more' : 'View less'}
      </Fab>

      <div>
        <Collapse in={show} timeout={animationDuration} unmountOnExit>
          <h1 style={{ backgroundColor: 'red', margin: 0 }}>
            Under Construction
          </h1>
        </Collapse>
      </div>
    </>
  );
};
