import { UserAvatar } from '../../../shared/components/user-avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Comment } from '../../../../models/Comment';
import { useCardComment } from '../../hooks/useCardComment';

type CardCommentProps = {
  userId: string;
  isLogged: boolean;
};

export const CardComment = ({
  _id,
  text,
  _user,
  updatedAt,
  userId,
  isLogged,
}: CardCommentProps & Comment) => {
  const {
    state,
    textFieldRef,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleViewOptions,
    handleClose,
    handleCancel,
  } = useCardComment({ _id: _id!, text });

  const open = Boolean(state.anchorEl);

  return (
    <ListItem sx={{ gap: 2 }}>
      <ListItemAvatar sx={{ minWidth: 'auto' }}>
        <UserAvatar
          imageUrl={_user.profilePic}
          username={_user.firstName + ' ' + _user.lastName}
        />
      </ListItemAvatar>
      {state.isEditing ? (
        <>
          <TextField
            inputRef={textFieldRef}
            fullWidth
            defaultValue={text}
            variant="filled"
            multiline
            inputProps={{ maxLength: 500 }}
          />
          <Box display="flex" flexDirection="column">
            <Button
              onClick={handleUpdate}
              variant="outlined"
              color="primary"
              sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            >
              Update
            </Button>
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="secondary"
              sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <ListItemText
          sx={{ wordBreak: 'break-word' }}
          primary={text}
          secondary={
            <Typography variant="body2" color="GrayText">
              {new Date(updatedAt!).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit',
                hour12: false,
              })}
            </Typography>
          }
        />
      )}
      {isLogged && _user._id === userId && (
        <>
          {!state.isEditing && (
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleViewOptions}
            >
              <MoreVertIcon />
            </IconButton>
          )}
          <Menu
            id="long-menu"
            anchorEl={state.anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>
              <ModeEditOutlinedIcon sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <DeleteOutlinedIcon sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
        </>
      )}
    </ListItem>
  );
};
