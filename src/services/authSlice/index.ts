import {
  userLoginEndPoint,
  userRegisterEndPoint,
} from "../../config/endPoints";
import { persistor, store } from "../../store";

import { setToken, setUser } from "../../store/auth";
import { api, formHeader } from "../api";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ body }: any) => {
        return {
          url: userRegisterEndPoint,
          method: "post",
          body,
          headers: formHeader,
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          console.log(
            "register user response :::::::::::: ",
            JSON.stringify(data)
          );

          //   dispatch(setUser(data?.items));
          // navigation.navigate('AuthNavigator', {
          //   screen: 'LoginScreen',
          // });
          dispatch(setToken(data?.token));

          //   dispatch(setLoading(false));
        } catch (e) {
          console.log("register user error :::::::::::: ", JSON.stringify(e));
          //   dispatch(setLoading(false));
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

          //   dispatch(setUser(data?.user));
          dispatch(setToken(data?.token));
        } catch (e: any) {
          //   errorMessage(e?.error?.data?.message || e?.error?.error);
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
  //   useForgotPasswordMutation,
  //   useLogoutUserMutation,
} = AuthApi;
