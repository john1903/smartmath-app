import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type CategoriesState = {
  allCategories: [];
};

const initialState: CategoriesState = {
  allCategories: [],
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setAllCategories: (state: CategoriesState, action: PayloadAction<any>) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setAllCategories } = slice.actions;

export default slice.reducer;
