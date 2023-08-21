import React from 'react';
import Button from '@mui/material/Button';
import { ArrowCircleRight, ArrowCircleLeft } from '@mui/icons-material';

const PrevButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick: Function;
    className: string;
    style: React.CSSProperties;
  }
>(({ onClick, className, style }, ref) => (
  <Button
    ref={ref}
    variant="outlined"
    color="primary"
    onClick={(event) => onClick(event)}
    className={className}
    style={style}
  >
    <ArrowCircleLeft sx={{ mr: 1 }} />
    Prev
  </Button>
));

const NextButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick: Function;
    className: string;
    style: React.CSSProperties;
  }
>(({ onClick, className, style }, ref) => (
  <Button
    ref={ref}
    variant="outlined"
    color="primary"
    onClick={(event) => onClick(event)}
    className={className}
    style={style}
  >
    Next
    <ArrowCircleRight sx={{ ml: 1 }} />
  </Button>
));

export { PrevButton, NextButton };
