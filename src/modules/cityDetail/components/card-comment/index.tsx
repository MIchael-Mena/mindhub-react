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
import React, { useRef } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { enqueueSnackbar } from 'notistack';
import { updateComment } from '../../../../store/actions/itinerary-extra';

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
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState({
    isEditing: false,
    anchorEl: null as null | HTMLElement,
    // anchorEl es una propiedad de Menu que indica donde se va a mostrar el menu en este caso se
    // cuando se le pase la referencia del boton de mas se va a mostrar en el boton de mas
  });

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setState((prevState) => ({
      ...prevState,
      isEditing: true,
      anchorEl: null,
    }));
  };

  const handleUpdate = () => {
    // Hacer dispatch de la accion de update
    dispatch(
      updateComment({
        _id: _id!,
        text: textFieldRef.current!.value,
      })
    ).then((e) => {
      if (e.meta.requestStatus === 'fulfilled')
        setState((prevState) => ({ ...prevState, isEditing: false }));
      else
        enqueueSnackbar('Error updating comment', {
          variant: 'error',
        });
    });
  };

  const handleDelete = () => {
    // Hacer dispatch de la accion de delete
    setState((prevState) => ({ ...prevState, anchorEl: null }));
  };

  const handleViewOptions = (event: React.MouseEvent<HTMLElement>) => {
    setState((prevState) => ({ ...prevState, anchorEl: event.currentTarget }));
  };

  const handleClose = () =>
    setState((prevState) => ({ ...prevState, anchorEl: null }));

  const handleCancel = () =>
    setState((prevState) => ({ ...prevState, isEditing: false }));

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
            <Button onClick={handleUpdate}>Update</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Box>
        </>
      ) : (
        <ListItemText
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
