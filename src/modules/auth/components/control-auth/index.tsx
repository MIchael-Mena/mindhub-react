import UserIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Button } from '@mui/material';
import { logout } from '../../../../store/actions/user';
import { ApiResponse } from '../../../../models/ApiResponse';
import { enqueueSnackbar } from 'notistack';
import { UserAvatar } from '../../../shared/components/user-avatar';

interface ControlAuthProps {
  handleLoginOpen: () => void;
}

export const ControlAuth = ({ handleLoginOpen }: ControlAuthProps) => {
  const { isLogged, user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      let resPayload = res.payload as ApiResponse<string>;
      if (resPayload.success) {
        enqueueSnackbar(resPayload.message, {
          variant: 'success',
        });
      }
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 1 }}
        onClick={isLogged ? handleLogout : handleLoginOpen}
      >
        {isLogged && user ? (
          <UserAvatar
            imageUrl={user.profilePic}
            username={`${user.firstName} ${user.lastName}`}
            sx={{
              mr: 1,
              width: '25px',
              height: '25px',
              fontSize: '0.7rem',
            }}
          />
        ) : (
          <UserIcon sx={{ mr: 1 }} />
        )}

        {isLogged ? 'Logout' : 'Login'}
      </Button>
    </>
  );
};
