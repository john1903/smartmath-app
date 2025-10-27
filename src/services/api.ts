import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";
import { logoutApp } from "../utils/logout";
import { setToken, setRefreshToken } from "../store/auth";
import type { RootState } from "../store";

// Base query
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers: any, { getState }: any) => {
    const { auth } = getState() as any;

    const lang = getState()?.lang?.language;

    headers.set("Accept-Language", lang);

    if (auth?.token) {
      headers.set("Authorization", `Bearer ${auth?.token}`);
    }
    headers.set("Accept", "application/json");
    if (!headers?.map) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

// Interceptor wrapper
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch, getState } = api;

  if (
    result?.error &&
    (result.error.status === 401 || result.error.status === 410)
  ) {
    try {
      // 1. Get refresh token directly from Redux
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      const deviceToken = state.auth.deviceToken;

      console.log("refreshToken ::::::::::::::::", refreshToken);

      if (refreshToken) {
        // 2. Call refresh API
        const refreshResult: any = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        console.log("refresh result ::::::::::::::: ", refreshResult);
        if (refreshResult?.data?.token && refreshResult?.data?.refreshToken) {
          const newAccessToken = refreshResult.data.token;
          const newRefreshToken = refreshResult.data.refreshToken;

          // 3. Update Redux state
          dispatch(setToken(newAccessToken));
          dispatch(setRefreshToken(newRefreshToken));

          // 4. Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          await logoutApp(dispatch, undefined, deviceToken);
        }
      } else {
        await logoutApp(dispatch, undefined, deviceToken);
      }
    } catch (err) {
      await logoutApp(dispatch);
    }
  }

  return result;
};

export const formHeader = {
  "Content-Type": "multipart/form-data",
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["reports", "submitAnswer"],
  endpoints: (builder) => ({}),
});
