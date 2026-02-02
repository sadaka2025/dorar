import { configureStore } from "@reduxjs/toolkit";
import selectedGenresReducer from "./reducers/selectedGenresSlice";
import movieModalReducer from "./reducers/movieModalSlice";

export const store = configureStore({
  reducer: {
    selectedGenres: selectedGenresReducer, // ⬅️ مهم جدًا
    movieModal: movieModalReducer,
  },
});
