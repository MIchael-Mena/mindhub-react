import { createSlice } from '@reduxjs/toolkit';
import { StatusResponse } from '../../models/StatusResponse';
import { Comment } from '../../models/Comment';
import { Activity } from '../../models/Acitivity';
import {
  createComment,
  deleteComment,
  fetchCommentsAndActivitiesByItineraryId,
  updateComment,
} from '../actions/itinerary-extra';

const itineraryExtraState: StatusResponse<{
  commentParams: {
    page: number;
    totalPages: number;
    totalCount: number;
  };
  comments: Comment[];
  activities: Activity[];
  itineraryId: string;
}> = {
  loading: false,
  error: null,
  data: {
    commentParams: {
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
        commentParams: { page: 0, totalPages: 0, totalCount: 0 },
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
        state.error = action.error;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        const commentId = action.payload.data._id;
        state.data.comments = state.data.comments.filter(
          (c) => c._id !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload.data!;
        const index = state.data.comments.findIndex(
          (c) => c._id === comment._id
        );
        state.data.comments[index] = comment;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
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
          state.data.commentParams = {
            ...state.data.commentParams,
            ...action.payload.commentParams,
          };
        }
      )
      .addCase(
        fetchCommentsAndActivitiesByItineraryId.rejected,
        (state, action) => {
          // es el error que devuelve el servidor 404 si no encuentra comentarios o actividades para ese itinerario
          // action.error.code === 'ERR_BAD_REQUEST'
          state.data = {
            commentParams: {
              page: 0,
              totalPages: 0,
              totalCount: 0,
            },
            comments: [] as Comment[],
            activities: [] as Activity[],
            itineraryId: '',
          };
          state.loading = false;
          state.error = action.error;
        }
      );
  },
});

export default itineraryExtraSlice.reducer;
