import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';
import { AppDispatch, RootState } from '../store';
import { Activity } from '../../models/Acitivity';
import { Comment, CommentToCreate } from '../../models/Comment';
import { PaginationData } from '../../models/PaginationData';
import { ApiResponse } from '../../models/ApiResponse';
import {
  CommentSearchParams,
  ItineraryExtraState,
} from '../../models/ItineraryExtra';
import { getApiError } from '../../utils/apiUtils';
import { COMMENT_DEFAULT_SORT_OPTION } from '../../modules/cities/util/sort-options';

interface CommentResponse extends PaginationData {
  comments: Comment[];
}

const maxCommentsPerPage = 4;

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
      return rejectWithValue(getApiError(error));
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
    return rejectWithValue(getApiError(error));
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
    return rejectWithValue(getApiError(error));
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
      commentParams: { order, sort },
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
          sort: sort!,
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
      return rejectWithValue(getApiError(error));
    }
  }
);

interface fetchCommentsParams extends CommentSearchParams {
  append?: boolean; // Si es true, se concatenan los comentarios al array existente
}

const fetchCommentsWithValidation =
  ({ sort, order, page, append }: fetchCommentsParams) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      commentParams: {
        order: currentOrder,
        sort: currentSort,
        page: currentPage,
        totalPages,
      },
    } = getState().itineraryExtraReducer.data;
    const activeSort = sort || currentSort!;
    const activeOrder = order || currentOrder!;
    if (
      page > totalPages ||
      (page === currentPage && order === currentOrder && sort === currentSort)
    )
      return;

    dispatch(
      fetchComments({ order: activeOrder, sort: activeSort, page, append })
    );
  };

const fetchComments = createAsyncThunk<
  { comments: Comment[] } & fetchCommentsParams & PaginationData,
  fetchCommentsParams,
  { rejectValue: ApiResponse<void> }
>(
  'fetchMoreComments',
  async (
    {
      order = COMMENT_DEFAULT_SORT_OPTION.order,
      page,
      sort = COMMENT_DEFAULT_SORT_OPTION.rawValue,
      append = false,
    }: fetchCommentsParams,
    { getState, rejectWithValue }
  ) => {
    try {
      const { itineraryId } = (getState() as RootState).itineraryExtraReducer
        .data;
      const commentsRes = await ApiService.getData<CommentResponse>(
        `/comment/for-itinerary/${itineraryId}`,
        {
          limit: maxCommentsPerPage,
          sort,
          order,
          page,
        }
      );

      const { comments, ...params } = commentsRes;

      return {
        comments,
        page,
        order,
        sort,
        ...params,
        append,
      };
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  }
);

export {
  updateComment,
  deleteComment,
  createComment,
  fetchCommentsAndActivitiesByItineraryId,
  fetchCommentsWithValidation,
  fetchComments,
};
