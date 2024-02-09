import { createSlice } from '@reduxjs/toolkit';
import { StatusResponse } from '../../models/StatusResponse';
import { Comment } from '../../models/Comment';
import { Activity } from '../../models/Acitivity';
import {
  createComment,
  deleteComment,
  fetchCommentsAndActivitiesByItineraryId,
  fetchComments,
  updateComment,
} from '../actions/itinerary-extra';
import { ApiResponse } from '../../models/ApiResponse';
import { ItineraryExtraState } from '../../models/ItineraryExtra';

const resetState = (
  state: StatusResponse<ItineraryExtraState, ApiResponse<void> | undefined>
) => {
  state.data = {
    commentParams: {
      page: 0,
      totalPages: 0,
      totalCount: 0,
      order: 'desc',
    },
    comments: [] as Comment[],
    activities: [] as Activity[],
    itineraryId: '',
  };
  state.loading = false;
  state.error = null;
};

const itineraryExtraState: StatusResponse<
  ItineraryExtraState,
  ApiResponse<void> | undefined
> = {
  loading: false,
  error: null,
  data: {
    commentParams: {
      order: 'desc',
      page: 0,
      totalPages: 0,
      totalCount: 0,
    },
    comments: [] as Comment[],
    activities: [] as Activity[],
    itineraryId: '',
  },
};

const itineraryExtraSlice = createSlice({
  name: 'comments',
  initialState: itineraryExtraState,
  reducers: {
    // Las acciones sincronicas van aca
    resetState: (state) => resetState(state),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data.comments.unshift(action.payload); // Debo asegurarme de ordenarlos segun el criterio que quiera
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const commentId = action.payload.commentId;
        state.data.comments = state.data.comments.filter(
          (c) => c._id !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        const index = state.data.comments.findIndex(
          (c) => c._id === comment._id
        );
        state.data.comments[index] = comment;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCommentsAndActivitiesByItineraryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCommentsAndActivitiesByItineraryId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data.comments = action.payload.comments;
          state.data.activities = action.payload.activities;
          state.data.itineraryId = action.payload.itineraryId;
          state.data.commentParams = {
            ...state.data.commentParams,
            ...action.payload.commentParams,
          };
        }
      )
      .addCase(
        fetchCommentsAndActivitiesByItineraryId.rejected,
        (state, action) => {
          resetState(state);
          state.error = action.payload;
        }
      )

      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { comments, ...params } = action.payload;
        state.data.comments =
          action.payload.page > 1 &&
          state.data.commentParams.order === params.order
            ? [...state.data.comments, ...comments]
            : comments;
        state.data.commentParams = params;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itineraryExtraSlice.reducer;
