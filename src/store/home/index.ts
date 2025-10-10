import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type HomeState = {
  allRecommendedExercise: [];
};

const initialState: HomeState = {
  allRecommendedExercise: [],
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAllRecommendedExercise: (
      state: HomeState,
      action: PayloadAction<any>
    ) => {
      state.allRecommendedExercise = action.payload;
    },
  },
});

export const { setAllRecommendedExercise } = slice.actions;

export default slice.reducer;
