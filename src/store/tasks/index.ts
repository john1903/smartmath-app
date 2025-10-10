import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TaskState = {
  allExercise: [];
};

const initialState: TaskState = {
  allExercise: [],
};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAllExercise: (state: TaskState, action: PayloadAction<any>) => {
      state.allExercise = action.payload;
    },
  },
});

export const { setAllExercise } = slice.actions;

export default slice.reducer;
