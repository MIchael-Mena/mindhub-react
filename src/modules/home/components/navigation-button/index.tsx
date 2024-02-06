import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  {
    direction: 'prev' | 'next';
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className: string;
    style: React.CSSProperties;
  }
>(({ direction, onClick, className, style }, ref) => (
  <Button
    ref={ref}
    variant="outlined"
    color="primary"
    onClick={(event) => onClick(event)}
    className={className}
    style={style}
  >
    {direction === 'prev' && (
      <>
        <ArrowCircleLeft sx={{ mr: 1 }} />
        Prev
      </>
    )}
    {direction === 'next' && (
      <>
        Next
        <ArrowCircleRight sx={{ ml: 1 }} />
      </>
    )}
  </Button>
));

export default NavigationButton;
