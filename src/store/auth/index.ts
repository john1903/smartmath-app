import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  user: {};
  deviceToken: string | null;
};

const initialState: AuthState = {
  token: "",
  refreshToken: "",
  user: {},
  deviceToken: "",
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
    setDeviceToken: (state: AuthState, action: PayloadAction<string>) => {
      state.deviceToken = action.payload;
    },
    setLogout: () => ({ ...initialState }),
  },
});

export const { setLogout, setUser, setToken, setRefreshToken, setDeviceToken } =
  slice.actions;

export default slice.reducer;
