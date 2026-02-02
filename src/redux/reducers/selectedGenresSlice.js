import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGenre: null,
};

const selectedGenresSlice = createSlice({
  name: "selectedGenres",
  initialState,
  reducers: {
    setSelectedGenre(state, action) {
      state.selectedGenre = action.payload;
    },
    clearSelectedGenre(state) {
      state.selectedGenre = null;
    },
  },
});

export const { setSelectedGenre, clearSelectedGenre } =
  selectedGenresSlice.actions;

/* ✅ SELECTOR الصحيح */
export const selectSelectedGenre = (state) =>
  state.selectedGenres.selectedGenre;

export default selectedGenresSlice.reducer;
