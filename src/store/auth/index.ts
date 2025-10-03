import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: {};
};

const initialState: AuthState = {
  token: "",
  refreshToken: "",
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
    setRefreshToken: (state: AuthState, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setLogout: () => ({ ...initialState }),
  },
});

export const { setLogout, setUser, setToken, setRefreshToken } = slice.actions;

export default slice.reducer;
