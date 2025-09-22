import {
  userDetailEndPoint,
  userFileEndPoint,
  userLoginEndPoint,
  userRegisterEndPoint,
} from "../../config/endPoints";
import { persistor, store } from "../../store";

import { setToken, setUser } from "../../store/auth";
import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ data }: any) => {
        return {
          url: userRegisterEndPoint,
          method: "post",
          body: data,
          // headers: formHeader,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { navigation } = args;
          console.log(
            "register user response :::::::::::: ",
            JSON.stringify(data)
          );

          showSuccessToast("User created successfully!");
          navigation.navigate("SignIn");
          // navigation.navigate("AuthNavigator", {
          //   screen: "LoginScreen",
          // });

          dispatch(setLoading(false));
        } catch (e) {
          console.log("register user error :::::::::::: ", JSON.stringify(e));
          dispatch(setLoading(false));
          showErrorToast("Something went wrong");
          //   errorMessage(e?.error?.data?.message || e?.error?.error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: ({ data }: any) => {
        return {
          url: userLoginEndPoint,
          method: "post",
          body: data,
        };
      },
      transformResponse: (result) => result,
      //   invalidatesTags: ['readUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { navigation } = args;

          console.log(
            "login user response :::::::::::: ",
            JSON.stringify(data)
          );

          dispatch(setLoading(false));
          dispatch(setToken(data?.token));
          showSuccessToast("Login successful!");
        } catch (e: any) {
          console.log(
            "login user response error :::::::::::: ",
            JSON.stringify(e)
          );
          dispatch(setLoading(false));

          //   errorMessage(e?.error?.data?.message || e?.error?.error);
          showErrorToast("Something went wrong");
        }
      },
    }),
    // updateUser: builder.mutation({
    //   query: ({ data }: any) => {
    //     return {
    //       url: userDetailEndPoint,
    //       method: "patch",
    //       body: data,
    //     };
    //   },
    //   transformResponse: (result) => result,
    //   //   invalidatesTags: ['readUser'],
    //   async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
    //     try {
    //       const result = await queryFulfilled;
    //       const { navigation } = args;

    //       console.log(
    //         "user update response :::::::::::: ",
    //         JSON.stringify(result)
    //       );

    //       dispatch(setLoading(false));
    //       // dispatch(setUser(data?.));
    //       showSuccessToast("User update successfully!");
    //     } catch (e: any) {
    //       console.log(
    //         "update user response error :::::::::::: ",
    //         JSON.stringify(e)
    //       );
    //       dispatch(setLoading(false));

    //       //   errorMessage(e?.error?.data?.message || e?.error?.error);
    //       showErrorToast("Something went wrong");
    //     }
    //   },
    // }),
    updateUser: builder.mutation({
      query: ({ data }: any) => ({
        url: "/users/me",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled; // meta has response info
          const status = meta.response?.status;

          if (status === 204) {
            showSuccessToast("User updated successfully!");
          }
        } catch (err) {
          console.log("Update user error ::::::::::: ", err);
          showErrorToast("Something went wrong!");
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    updateFile: builder.mutation({
      query: ({ data }: any) => {
        return {
          url: userFileEndPoint,
          method: "post",
          body: data,
          formData: true,
        };
      },
      transformResponse: (result) => result,
      //   invalidatesTags: ['readUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { navigation } = args;

          console.log(
            "user update file response :::::::::::: ",
            JSON.stringify(data)
          );

          dispatch(setLoading(false));
          // dispatch(setUser(data?.));
          showSuccessToast("User update file successfully!");
        } catch (e: any) {
          console.log(
            "update user file response error :::::::::::: ",
            JSON.stringify(e)
          );
          dispatch(setLoading(false));

          //   errorMessage(e?.error?.data?.message || e?.error?.error);
          showErrorToast("Something went wrong");
        }
      },
    }),
    // forgotPassword: builder.mutation({
    //   query: ({body}: any) => {
    //     return {
    //       url: 'auth/forgot-password',
    //       method: 'post',
    //       body,
    //     };
    //   },
    //   transformResponse: result => result,
    //   invalidatesTags: ['readUser'],
    //   async onQueryStarted(args, {dispatch, queryFulfilled, getState}) {
    //     try {
    //       const {data} = await queryFulfilled;

    //       const {navigation, body, type} = args;
    //       dispatch(setLoading(false));
    //       successMessage(data?.message || 'OTP has been sent.');
    //       if (type == 'forgotPassword') {
    //         navigation.navigate('OtpVerifyScreen', {email: body?.email});
    //       }
    //     } catch (e) {
    //       dispatch(setLoading(false));

    //       errorMessage(e?.error?.data?.message || e?.error?.error);
    //     }
    //   },
    // }),
    // logoutUser: builder.mutation({
    //   query: body => {
    //     console.log(body);
    //     return {
    //       url: 'auth/logout',
    //       method: 'post',
    //       body,
    //     };
    //   },
    //   transformResponse: result => result,

    //   async onQueryStarted(args, {dispatch, queryFulfilled, getState}) {
    //     try {
    //       const {data} = await queryFulfilled;
    //       await persistor.purge();
    //       dispatch(setLogout());
    //       dispatch(setCleanWorksite());
    //       dispatch(setLoading(false));
    //     } catch (e) {
    //       dispatch(setLoading(false));
    //       errorMessage(e?.error?.data?.message || e?.error?.error);
    //     }
    //   },
    // }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useUpdateFileMutation,
  //   useForgotPasswordMutation,
  //   useLogoutUserMutation,
} = AuthApi;
