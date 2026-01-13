import { createSlice } from "@reduxjs/toolkit";

export const movieModalSlice = createSlice({
  name: "movieModal",
  initialState: {
    enabled: false,
    movieId: null,
    dataset: null,
  },
  reducers: {
    // Fermer le modal
    hide: (state) => {
      state.enabled = false;
      state.movieId = null;
      state.dataset = null;
    },

    // Ouvrir le modal
    showMovie: (state, action) => {
      state.enabled = true;
      state.movieId = action.payload.id; // correspond à ton code existant
      state.dataset = action.payload.dataset;
    },
  },
});

// Export des actions
export const { hide, showMovie } = movieModalSlice.actions;

// Selector pour accéder au state dans les composants
export const selectMovieModal = (state) => state.movieModal;

// Export du reducer
export default movieModalSlice.reducer;
