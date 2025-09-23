import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LangState = {
  language: string | null;
};

const initialState: LangState = {
  language: "en-GB",
};

const slice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state: LangState, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = slice.actions;

export default slice.reducer;
