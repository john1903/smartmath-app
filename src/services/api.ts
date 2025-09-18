// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // const baseQuery = fetchBaseQuery({
// //   baseUrl: "https://your-api.com",
// //   prepareHeaders: async (headers) => {
// //     const token = await AsyncStorage.getItem("token");
// //     if (token) {
// //       headers.set("Authorization", `Bearer ${token}`);
// //     }
// //     headers.set("Content-Type", "application/json");
// //     return headers;
// //   },
// // });

// // export const api = createApi({
// //   reducerPath: "api",
// //   baseQuery,
// //   endpoints: (builder) => ({
// //     login: builder.mutation<
// //       { token: string; user: any },
// //       { email: string; password: string }
// //     >({
// //       query: (credentials) => ({
// //         url: "/auth/login",
// //         method: "POST",
// //         body: credentials,
// //       }),
// //     }),
// //     getMe: builder.query<{ email: string }, void>({
// //       query: () => "/auth/me",
// //     }),
// //   }),
// // });

// // export const { useLoginMutation, useGetMeQuery } = api;

// // import { API_URL } from "@/config";
// // import { logoutUser } from "@/store/auth";
// import {
//   BaseQueryFn,
//   FetchArgs,
//   createApi,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../config";
// import { logoutUser } from "../utils/logout";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,

//   prepareHeaders: (headers, { getState }) => {
//     const { auth } = getState() as any;

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
//   const { dispatch, endpoint, getState }: any = api;

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

// export const api = createApi({
//   baseQuery: baseQueryWithInterceptor,
//   tagTypes: [],
//   endpoints: () => ({}),
// });

import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";
import { logoutUser } from "../utils/logout";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as any;

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

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch }: any = api;

  if (
    result?.error &&
    (result?.error.status === 401 || result?.error?.status == 410)
  ) {
    await logoutUser(dispatch);
  }

  return result;
};

export const formHeader = {
  "Content-Type": "multipart/form-data",
};

// ✅ Fix: endpoints must take builder
export const api = createApi({
  reducerPath: "api", // optional but recommended
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [],
  endpoints: (builder) => ({}), // ✅ Correct way
});
