import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Itinerary } from '../../models/Itinerary';

interface ActiveItineraryState {
  itineraryId: string | null; // Uso strign ya que con el id del itinerario se puede acceder al itinerario
}

const initialState: ActiveItineraryState = {
  itineraryId: null,
};

const activeItinerarySlice = createSlice({
  name: 'activeItinerary',
  initialState,
  reducers: {
    setActiveItinerary: (state, action: PayloadAction<string | null>) => {
      state.itineraryId = action.payload;
    },
  },
});

export const { setActiveItinerary } = activeItinerarySlice.actions;

export default activeItinerarySlice.reducer;

// Uso de redux toolkit
// const activeItinerary = useAppSelector(
//   (state) => state.activeItinerary.itinerary
// );
// dispatch(setActiveItinerary(itinerary));
