import {
  SerializedError,
  combineReducers,
  createReducer,
} from '@reduxjs/toolkit';
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
import { Itinerary } from '../../models/Itinerary';
import { Like } from '../../models/Like';

const cityState: StatusResponse<City, SerializedError> = {
  loading: true,
  error: null,
  data: {} as City,
};

const cityReducer = createReducer(cityState, (builder) => {
  builder
    .addCase(updateCitySelected, (state, action) => {
      // Nota: state.data tendra un ciudad con sus itinerarios y estos tienen el atributo likes
      // que no se usaran, en su lugar se usara el state.itinerariesLikes. Se podria eliminar el
      // atributo likes de los itinerarios, pero no se hara por si se quiere usar en un futuro.
      state.data = action.payload;
      state.loading = false;
    })

    .addCase(fetchCitySelectedById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCitySelectedById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(fetchCitySelectedById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
});

const itinerariesLikesState: Like[] = [];

const updateItinerariesLikes = (state: Like[], itineraries: Itinerary[]) => {
  // Para modificar el state al tratarse de un "array" de objetos, se debe usar el metodo splice,
  // push, pop, etc. y no se debe usar el operador =, ya que este ultimo no modifica el state.
  // O tambien se puede crear una copia del state y modificar la copia y luego asignar la copia al state
  state.splice(0, state.length); // Limpia el array existente
  itineraries.forEach((itinerary: Itinerary) => {
    state.push({ id: itinerary._id, likes: itinerary.likes! });
  });
};

const updateLikes = (
  state: Like[],
  itineraryId: string,
  totalLikes: number
) => {
  let itinerariesLikes = [...state];
  itinerariesLikes.forEach((itinerary) => {
    if (itinerary.id === itineraryId) {
      itinerary.likes = totalLikes;
    }
  });
  state = itinerariesLikes;
};

const itinerariesLikesReducer = createReducer(
  itinerariesLikesState,
  (builder) => {
    builder
      .addCase(updateCitySelected, (state, action) => {
        updateItinerariesLikes(state, action.payload.itineraries!);
      })
      .addCase(fetchCitySelectedById.fulfilled, (state, action) => {
        updateItinerariesLikes(state, action.payload.itineraries!);
      })
      .addCase(fetchCitySelectedById.rejected, (state, _action) => {
        state.splice(0, state.length);
      })
      .addCase(addFavouriteItinerary.fulfilled, (state, action) => {
        if (!action.payload.success) return;
        updateLikes(
          state,
          action.payload.data?.itineraryId!,
          action.payload.data?.totalLikes!
        );
      })
      .addCase(removeFavouriteItinerary.fulfilled, (state, action) => {
        if (!action.payload.success) return;
        updateLikes(
          state,
          action.payload.data?.itineraryId!,
          action.payload.data?.totalLikes!
        );
      });
  }
);

const citySelectedReducer = combineReducers({
  city: cityReducer,
  itinerariesLikes: itinerariesLikesReducer,
});

export { citySelectedReducer };
