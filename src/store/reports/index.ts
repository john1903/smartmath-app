import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ReportsState = {
  allReports: [];
};

const initialState: ReportsState = {
  allReports: [],
};

const slice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setAllReports: (state: ReportsState, action: PayloadAction<any>) => {
      state.allReports = action.payload;
    },
  },
});

export const { setAllReports } = slice.actions;

export default slice.reducer;
