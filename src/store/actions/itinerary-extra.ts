import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';
import { RootState } from '../store';
import { Activity } from '../../models/Acitivity';
import { Comment, CommentToCreate } from '../../models/Comment';
import { PaginationData } from '../../models/PaginationData';
import { AxiosError } from 'axios';
import { ApiResponse } from '../../models/ApiResponse';
import {
  CommentPaginationOptions,
  ItineraryExtraState,
} from '../../models/ItineraryExtra';
// import { enqueueSnackbar } from 'notistack';

interface CommentResponse extends PaginationData {
  comments: Comment[];
}

const maxCommentsPerPage = 4;

const getErrorMessage = (err: any) => {
  const error: AxiosError<ApiResponse<void>> = err;
  const apiRes =
    error.response && error.response.data
      ? error.response.data
      : ({
          success: false,
          message: 'An error has occurred while processing your request', // mensaje generico, cada accion podria tener su propio mensaje
        } as ApiResponse<void>);
  /*   enqueueSnackbar(apiRes.message, {
    variant: 'error',
  }); */
  return apiRes;
};

const updateComment = createAsyncThunk<
  Comment,
  { _id: string; text: string },
  { rejectValue: ApiResponse<void> }
>(
  'updateComment',
  async (comment: { _id: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await ApiService.patchData<Comment>(
        `/comment/update/${comment._id}`,
        { text: comment.text }
      );
      return response.data!;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const deleteComment = createAsyncThunk<
  { commentId: string },
  string,
  { rejectValue: ApiResponse<void> }
>('deleteComment', async (commentId: string, { rejectWithValue }) => {
  try {
    // no me interesa lo que devuelve el backend, solo el id del comentario eliminado
    await ApiService.deleteData<string>(`/comment/delete/${commentId}`);
    // el backend en data responde con un mensaje de exito, en su lugar se devuelve el id del comentario eliminado
    return { commentId: commentId };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const createComment = createAsyncThunk<
  Comment,
  CommentToCreate,
  { rejectValue: ApiResponse<void> }
>('createComment', async (comment: CommentToCreate, { rejectWithValue }) => {
  try {
    const response = await ApiService.postData<Comment>(
      '/comment/create',
      comment
    );
    return response.data!;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const fetchCommentsAndActivitiesByItineraryId = createAsyncThunk<
  ItineraryExtraState,
  string,
  { rejectValue: ApiResponse<void> }
>(
  'fetchCommentsAndActivitiesByItineraryId',
  async (itineraryId: string, { getState, rejectWithValue }) => {
    const {
      itineraryId: currentItineraryId,
      commentParams: { order },
    } = (getState() as RootState).itineraryExtraReducer.data;
    if (itineraryId === currentItineraryId) {
      // Si el itineraryId no ha cambiado, simplemente devuelve el estado actual.
      return (getState() as RootState).itineraryExtraReducer.data;
    }
    try {
      const commentsPromise = ApiService.getData<CommentResponse>(
        `/comment/for-itinerary/${itineraryId}`,
        {
          limit: maxCommentsPerPage,
          sort: 'updatedAt',
          order: order!,
        }
      );
      const activitiesPromise = ApiService.getData<Activity[]>(
        `/activity/for-itinerary/${itineraryId}`
      );

      /*       const [commentsResult, activitiesResult] = await Promise.allSettled([
        commentsPromise,
        activitiesPromise,
      ]); */
      const [commentRes, activities] = await Promise.all([
        commentsPromise,
        activitiesPromise,
      ]);

      const { comments, ...commentParamsRes } = commentRes;
      const commentParams = {
        page: 1,
        ...commentParamsRes,
      };

      return {
        comments,
        commentParams,
        activities,
        itineraryId,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const fetchComments = createAsyncThunk<
  { comments: Comment[] } & CommentPaginationOptions & PaginationData,
  CommentPaginationOptions,
  { rejectValue: ApiResponse<void> }
>(
  'fetchMoreComments',
  async (
    { order, page }: CommentPaginationOptions,
    { getState, rejectWithValue }
  ) => {
    const {
      itineraryId,
      comments,
      commentParams: {
        page: currentPage,
        totalPages,
        order: currentOrder,
        totalCount,
      },
    } = (getState() as RootState).itineraryExtraReducer.data;
    const activeOrder = order || currentOrder!;
    if (page > totalPages || (page === 1 && activeOrder === currentOrder)) {
      // Si no hay más páginas. Evito hacer la llamada al servidor.
      return {
        comments,
        page: currentPage,
        order: currentOrder,
        totalPages,
        totalCount,
      };
    }
    try {
      const commentsRes = await ApiService.getData<CommentResponse>(
        `/comment/for-itinerary/${itineraryId}`,
        {
          limit: maxCommentsPerPage,
          sort: 'updatedAt',
          order: activeOrder,
          page,
        }
      );

      const { comments, ...params } = commentsRes;

      return {
        comments,
        page,
        order: activeOrder,
        ...params,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export {
  updateComment,
  deleteComment,
  createComment,
  fetchCommentsAndActivitiesByItineraryId,
  fetchComments,
};
