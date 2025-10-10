// src/utils/logout.ts
import { setLogout } from "../store/auth";
import { setLoading } from "../store/loading";

export const logoutUser = async (dispatch: any) => {
  dispatch(setLoading(true));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  dispatch(setLogout());

  dispatch(setLoading(false));
};
