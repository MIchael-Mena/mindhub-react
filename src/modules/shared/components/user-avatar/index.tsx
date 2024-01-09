import { Avatar } from '@mui/material';
import { stringAvatar } from '../../../../utils/util';

interface UserAvatarProps {
  imageUrl: string;
  username: string;
}

export const UserAvatar = ({
  imageUrl,
  username,
}: UserAvatarProps): JSX.Element => {
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
      {isValidUrl(imageUrl) ? (
        <Avatar alt={username} src={imageUrl} />
      ) : (
        <Avatar {...stringAvatar(username)} />
      )}
    </>
  );
};
