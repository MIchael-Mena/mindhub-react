import { useCallback, useState, useRef } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { enqueueSnackbar } from 'notistack';
import {
  deleteComment,
  updateComment,
} from '../../../store/actions/itinerary-extra';

export const useCardComment = ({
  _id,
  text,
}: {
  _id: string;
  text: string;
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    isEditing: false,
    anchorEl: null as null | HTMLElement,
    // anchorEl es una propiedad de Menu que indica donde se va a mostrar el menu en este caso se
    // cuando se le pase la referencia del boton de mas se va a mostrar en el boton de mas
  });

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleEdit = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isEditing: true,
      anchorEl: null,
    }));
  }, []);

  const handleUpdate = useCallback(() => {
    if (textFieldRef.current && !textFieldRef.current.value) {
      enqueueSnackbar('Comment can not be empty', {
        variant: 'warning',
      });
      return;
    } else if (textFieldRef.current && textFieldRef.current.value === text) {
      return;
    }
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
  }, [dispatch, text]);

  const handleDelete = useCallback(() => {
    dispatch(deleteComment(_id!)).then((e) => {
      if (e.meta.requestStatus === 'fulfilled')
        setState((prevState) => ({ ...prevState, anchorEl: null }));
      else
        enqueueSnackbar('Error deleting comment', {
          variant: 'error',
        });
    });
  }, [dispatch]);

  const handleViewOptions = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setState((prevState) => ({
        ...prevState,
        anchorEl: event.currentTarget,
      }));
    },
    []
  );

  const handleClose = useCallback(
    () => setState((prevState) => ({ ...prevState, anchorEl: null })),
    []
  );

  const handleCancel = useCallback(
    () => setState((prevState) => ({ ...prevState, isEditing: false })),
    []
  );

  return {
    state,
    textFieldRef,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleViewOptions,
    handleClose,
    handleCancel,
  };
};
