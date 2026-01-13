import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    selectedCategory: null, // la catégorie sélectionnée dans le Sidebar
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export const selectCategory = (state) => state.category.selectedCategory;
export default categorySlice.reducer;
