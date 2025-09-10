import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  user: {};
};

const initialState: AuthState = {
  token: "",
  user: {},
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLogout: () => ({ ...initialState }),
  },
});

export const { setLogout, setUser, setToken } = slice.actions;

export default slice.reducer;
