import { Avatar, AvatarProps, Tooltip } from '@mui/material';
import { stringAvatar } from '../../../../utils/util';

interface UserAvatarProps {
  imageUrl: string;
  username: string;
  tooltipPlacement?: 'bottom' | 'top' | 'left' | 'right';
}

export const UserAvatar = ({
  imageUrl,
  username,
  tooltipPlacement = 'bottom',
  ...rest
}: UserAvatarProps & AvatarProps): JSX.Element => {
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Tooltip title={username} placement={tooltipPlacement} arrow>
        {isValidUrl(imageUrl) ? (
          <Avatar alt={username} src={imageUrl} {...rest} />
        ) : (
          <Avatar {...stringAvatar(username)} {...rest} />
        )}
      </Tooltip>
    </>
  );
};
