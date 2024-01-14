import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';
import { RootState } from '../store';
import { Activity } from '../../models/Acitivity';
import { Comment } from '../../models/Comment';

const updateComment = createAsyncThunk(
  'updateComment',
  async (comment: { _id: string; text: string }) => {
    try {
      console.log('comment', comment);
      const response = await ApiService.patchData<Comment>(
        `/comment/update/${comment._id}`,
        comment
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const deleteComment = createAsyncThunk(
  'deleteComment',
  async (commentId: string) => {
    try {
      const response = await ApiService.deleteData<Comment>(
        `/comment/delete/${commentId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const createComment = createAsyncThunk(
  'createComment',
  async (comment: {
    text: string;
    onModel: string; // El modelo al que pertenece el comentario (itinerary o activity)
    _reference: string; // El id del itinerario o actividad
    _user: string; // El id del usuario
  }) => {
    try {
      const response = await ApiService.postData<Comment>(
        '/comment/create',
        comment
      );
      return response.data!;
    } catch (error) {
      throw error;
    }
  }
);

const fetchCommentsAndActivitiesByItineraryId = createAsyncThunk(
  'fetchCommentsAndActivitiesByItineraryId',
  async (itineraryId: string, { getState }) => {
    const { itineraryId: currentItineraryId } = (getState() as RootState)
      .itineraryExtraReducer.data;
    if (itineraryId === currentItineraryId) {
      // Si el itineraryId no ha cambiado, simplemente devuelve el estado actual.
      return (getState() as RootState).itineraryExtraReducer.data;
    }
    try {
      const commentsPromise = ApiService.getData<Comment[]>(
        `/comment/for-itinerary/${itineraryId}`
      );
      const activitiesPromise = ApiService.getData<Activity[]>(
        `/activity/for-itinerary/${itineraryId}`
      );

      const [comments, activities] = await Promise.all([
        commentsPromise,
        activitiesPromise,
      ]);

      return { comments, activities, itineraryId };
    } catch (error) {
      throw error;
    }
  }
);

export {
  updateComment,
  deleteComment,
  fetchCommentsAndActivitiesByItineraryId,
  createComment,
};
