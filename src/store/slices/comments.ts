import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusResponse } from '../../models/StatusResponse';
import { Comment } from '../../models/Comment';
import { ApiService } from '../../services/api.service';
import { Activity } from '../../models/Acitivity';

export const fetchCommentsAndActivitiesByItineraryId = createAsyncThunk(
  'fetchCommentsAndActivitiesByItineraryId',
  async (itineraryId: string) => {
    try {
      const comments = await ApiService.getData<Comment[]>(
        `/comment/for-itinerary/${itineraryId}`
      );
      const activities = await ApiService.getData<Activity[]>(
        `/activity/for-itinerary/${itineraryId}`
      );
      return { comments, activities };
    } catch (error) {
      throw error;
    }
  }
);

const itinerarySelectedState: StatusResponse<{
  comments: Comment[];
  activities: Activity[];
}> = {
  loading: false,
  error: null,
  data: { comments: [] as Comment[], activities: [] as Activity[] },
};

// Crear el slice del estado
const itinerarySelectedSlice = createSlice({
  name: 'comments',
  initialState: itinerarySelectedState,
  reducers: {}, // Las acciones sincronicas van aca
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAndActivitiesByItineraryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCommentsAndActivitiesByItineraryId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchCommentsAndActivitiesByItineraryId.rejected,
        (state, action) => {
          // es el error que devuelve el servidor 404 si no encuentra comentarios o actividades para ese itinerario
          // action.error.code === 'ERR_BAD_REQUEST'
          state.data = { comments: [], activities: [] };
          state.loading = false;
          state.error = action.error;
        }
      );
  },
});

export default itinerarySelectedSlice.reducer;
