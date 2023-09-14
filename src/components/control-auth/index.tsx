import UserIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Avatar, Button, Tooltip } from '@mui/material';
import { logout } from '../../store/actions/user';
import { ApiResponse } from '../../models/ApiResponse';
import { stringAvatar } from '../../utils/util';

interface ControlAuthProps {
  handleLoginOpen: () => void;
}

export const ControlAuth = ({
  handleLoginOpen: handleOpen,
}: ControlAuthProps) => {
  const { isLogged, user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout()).then((res) => {
      let resPayload = res.payload as ApiResponse<string>;
      if (resPayload.success) {
        alert(resPayload.message);
      }
    });
  };

  const avatar = (userNames: string) => (
    <Tooltip title={userNames} placement="bottom" arrow>
      {user.profilePic ? (
        <Avatar
          alt={userNames}
          src={user.profilePic}
          sx={{ width: 25, height: 25, mr: 1 }}
        />
      ) : (
        <Avatar
          {...stringAvatar(userNames)}
          sx={{ width: 25, height: 25, mr: 1 }}
        />
      )}
    </Tooltip>
  );

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 1 }}
        onClick={isLogged ? handleLogout : handleOpen}
      >
        {isLogged && user ? (
          avatar(`${user.name} ${user.surname}`)
        ) : (
          <UserIcon sx={{ mr: 1 }} />
        )}

        {isLogged ? 'Logout' : 'Login'}
      </Button>
    </>
  );
};
