import { Fab } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import './style.css';
import { useAppSelector } from '../../../../store/hooks';

interface ButtonViewMoreProps {
  show: boolean;
  handleShow: () => void;
  animationDuration: number;
}

export const ButtonViewMore = ({
  show,
  handleShow,
  animationDuration,
}: ButtonViewMoreProps) => {
  const loading = useAppSelector(
    (store) => store.itineraryExtraReducer.loading
  );
  return (
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
      {loading ? (
        <div
          style={{ width: '70px', display: 'flex', justifyContent: 'center' }}
        >
          <div className="dot-elastic"></div>
        </div>
      ) : !show ? (
        'View more'
      ) : (
        'View less'
      )}
    </Fab>
  );
};
