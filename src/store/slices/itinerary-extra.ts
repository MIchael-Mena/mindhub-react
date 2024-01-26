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

const itineraryExtraState: StatusResponse<
  ItineraryExtraState,
  ApiResponse<undefined> | undefined
> = {
  loading: false,
  error: null,
  data: {
    commentParams: {
      order: 'asc',
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
    resetState: (state) => {
      state.data = {
        comments: [],
        activities: [],
        itineraryId: '',
        commentParams: {
          page: 0,
          totalPages: 0,
          totalCount: 0,
          order: 'asc',
        },
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data.comments.push(action.payload); // Debo asegurarme de ordenarlos segun el criterio que quiera
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
          state.data = {
            commentParams: {
              page: 0,
              totalPages: 0,
              totalCount: 0,
              order: 'asc',
            },
            comments: [] as Comment[],
            activities: [] as Activity[],
            itineraryId: '',
          };
          state.loading = false;
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
        /*         state.data.commentParams = {
          ...state.data.commentParams,
          ...params,
        }; */
        state.data.commentParams = params;
        /*         const comments = action.payload.comments;
        state.data.comments =
          comments.length > 0
            ? [...state.data.comments, ...comments]
            : state.data.comments; */
        // state.data.commentParams.page = action.payload.page;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itineraryExtraSlice.reducer;
