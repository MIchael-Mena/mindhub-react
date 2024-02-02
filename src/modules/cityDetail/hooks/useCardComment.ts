import { useCallback, useState, useRef } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { enqueueSnackbar } from 'notistack';
import {
  deleteComment,
  updateComment,
} from '../../../store/actions/itinerary-extra';
import { ApiResponse } from '../../../models/ApiResponse';
import { handleSnackbar } from '../../../utils/apiUtils';

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
    // anchorEl es una propiedad de Menu que determina dónde se mostrará el menú.
    // En este caso, se mostrará en el botón que se pasa como referencia.
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
        _id: _id,
        text: textFieldRef.current!.value,
      })
    )
      .unwrap()
      .then((_res) =>
        setState((prevState) => ({ ...prevState, isEditing: false }))
      )
      .catch((res: ApiResponse<void>) => {
        handleSnackbar(res.message, 'error');
      });
  }, [text]);

  const handleDelete = useCallback(() => {
    dispatch(deleteComment(_id))
      .unwrap()
      .then((_res) =>
        setState((prevState) => ({ ...prevState, anchorEl: null }))
      )
      .catch((res: ApiResponse<void>) => {
        handleSnackbar(res.message, 'error');
      });
  }, []);

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
