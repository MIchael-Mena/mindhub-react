import { createReducer } from '@reduxjs/toolkit';
import { City } from '../../models/City';
import {
  addFavouriteItinerary,
  removeFavouriteItinerary,
} from '../actions/user';
import {
  fetchCitySelectedById,
  updateCitySelected,
} from '../actions/city-selected';
import { StatusResponse } from '../../models/StatusResponse';

const citySelectedState: StatusResponse<City> & { hasBeenModified: boolean } = {
  loading: true,
  error: null,
  data: {} as City,
  hasBeenModified: false,
};

const citySelectedReducer = createReducer(citySelectedState, (builder) => {
  builder
    .addCase(addFavouriteItinerary.fulfilled, (state, action) => {
      // TODO: Mejorar, esta solucion esta generando un render en CityDetail cada vez que se agrega un like
      if (!action.payload.success) return;
      let itineraries = [...state.data.itineraries!];
      itineraries.forEach((itinerary) => {
        if (itinerary._id === action.payload.data?.itineraryId) {
          itinerary.likes = action.payload.data?.totalLikes;
        }
      });

      state.data.itineraries = itineraries;
    })
    .addCase(removeFavouriteItinerary.fulfilled, (state, action) => {
      if (!action.payload.success) return;
      let itineraries = [...state.data.itineraries!];
      itineraries.forEach((itinerary) => {
        if (itinerary._id === action.payload.data?.itineraryId) {
          itinerary.likes = action.payload.data?.totalLikes;
        }
      });

      state.data.itineraries = itineraries;
    })
    .addCase(updateCitySelected, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.hasBeenModified = true;
    })

    .addCase(fetchCitySelectedById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCitySelectedById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.city;
      state.hasBeenModified = true;
    })
    .addCase(fetchCitySelectedById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
});

export { citySelectedReducer };
