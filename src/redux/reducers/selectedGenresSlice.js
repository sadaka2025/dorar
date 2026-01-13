import { createSlice } from "@reduxjs/toolkit";

export const selectedGenresSlice = createSlice({
  name: "selectedGenres",
  initialState: {
    genre: null, // un seul genre sélectionné : { id, title, videos }
  },
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload; // sélectionner un genre
    },
    clearGenre: (state) => {
      state.genre = null; // réinitialiser
    },
  },
});

// Actions exportées
export const { setGenre, clearGenre } = selectedGenresSlice.actions;

// Sélecteur officiel pour les composants
export const selectSelectedGenre = (state) => state.selectedGenres.genre;

export default selectedGenresSlice.reducer;
