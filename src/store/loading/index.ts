import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state: LoadingState, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = slice.actions;

export default slice.reducer;
