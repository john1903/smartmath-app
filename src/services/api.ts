// import {
//   BaseQueryFn,
//   FetchArgs,
//   createApi,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../config";
// import { logoutUser } from "../utils/logout";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }: any) => {
//     const { auth } = getState() as any;

//     const lang = getState()?.lang?.language; // 👈 from Redux

//     headers.set("Accept-Language", lang);

//     if (auth?.token) {
//       headers.set("Authorization", `Bearer ${auth?.token}`);
//     }
//     headers.set("Accept", "application/json");
//     if (!headers?.map) {
//       headers.set("Content-Type", "application/json");
//     }
//     return headers;
//   },
// });

// const baseQueryWithInterceptor: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   const { dispatch }: any = api;

//   if (
//     result?.error &&
//     (result?.error.status === 401 || result?.error?.status == 410)
//   ) {
//     await logoutUser(dispatch);
//   }

//   return result;
// };

// export const formHeader = {
//   "Content-Type": "multipart/form-data",
// };

// // ✅ Fix: endpoints must take builder
// export const api = createApi({
//   reducerPath: "api", // optional but recommended
//   baseQuery: baseQueryWithInterceptor,
//   tagTypes: ["reports"],
//   endpoints: (builder) => ({}), // ✅ Correct way
// });

// =================================

// import {
//   BaseQueryFn,
//   FetchArgs,
//   createApi,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../config";
// import { logoutUser } from "../utils/logout";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { setToken } from "../store/auth"; // 👈 use your existing setToken

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState }: any) => {
//     const { auth } = getState() as any;
//     const lang = getState()?.lang?.language;

//     headers.set("Accept-Language", lang || "en");

//     if (auth?.token) {
//       headers.set("Authorization", `Bearer ${auth.token}`);
//     }

//     headers.set("Accept", "application/json");
//     if (!headers?.map) {
//       headers.set("Content-Type", "application/json");
//     }
//     return headers;
//   },
// });

// const baseQueryWithInterceptor: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   const { dispatch }: any = api;

//   if (
//     result?.error &&
//     (result.error.status === 401 || result.error.status === 410)
//   ) {
//     try {
//       // 1. Get refresh token from storage
//       const refreshToken = await AsyncStorage.getItem("refreshToken");

//       if (refreshToken) {
//         // 2. Call refresh API with body
//         const refreshResult: any = await baseQuery(
//           {
//             url: "/auth/refresh",
//             method: "POST",
//             body: { refreshToken },
//           },
//           api,
//           extraOptions
//         );

//         if (refreshResult?.data?.token && refreshResult?.data?.refreshToken) {
//           const newAccessToken = refreshResult.data.token;
//           const newRefreshToken = refreshResult.data.refreshToken;

//           // 3. Save both tokens in storage
//           await AsyncStorage.setItem("refreshToken", newRefreshToken);
//           await AsyncStorage.setItem("accessToken", newAccessToken);

//           // 4. Update Redux state using setToken
//           dispatch(setToken(newAccessToken));

//           // 5. Retry the original request with new token
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           await logoutUser(dispatch);
//         }
//       } else {
//         await logoutUser(dispatch);
//       }
//     } catch (err) {
//       await logoutUser(dispatch);
//     }
//   }

//   return result;
// };

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithInterceptor,
//   tagTypes: ["reports"],
//   endpoints: (builder) => ({}),
// });

// ===============================================

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";
import { logoutUser } from "../utils/logout";
import { setToken, setRefreshToken } from "../store/auth";
import type { RootState } from "../store"; // 👈 use your RootState type

// Base query
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const { token } = state.auth;
    const lang = state?.lang?.language || "en";

    console.log("token ::::::::::::::::", token);

    headers.set("Accept-Language", lang);
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
          await logoutUser(dispatch);
        }
      } else {
        await logoutUser(dispatch);
      }
    } catch (err) {
      await logoutUser(dispatch);
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["reports"],
  endpoints: (builder) => ({}),
});
