// import { CircularProgress } from '@mui/material';
import styles from './loader-transition.module.scss';

const LoaderTransition = () => {
  // return <CircularProgress />;
  return (
    <>
      <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={styles.spin2}
          cx="400"
          cy="400"
          fill="none"
          r="245"
          stroke-width="12"
          stroke="#d17383"
          stroke-dasharray="700 1400"
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};

export default LoaderTransition;
