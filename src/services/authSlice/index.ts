import {
  userDetailEndPoint,
  userFileEndPoint,
  userLoginEndPoint,
  userRegisterEndPoint,
} from "../../config/endPoints";
import {
  LoginRequest,
  LoginResponse,
  RegisterUserPayload,
  RegisterUserResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from "../../models/Auth";
import { UploadFilePayload, UploadFileResponse } from "../../models/File";

import { setRefreshToken, setToken, setUser } from "../../store/auth";
import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api } from "../api";

import i18n from "i18next";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserPayload>({
      query: ({ data }) => {
        return {
          url: userRegisterEndPoint,
          method: "post",
          body: data,
        };
      },
      transformResponse: (result: RegisterUserResponse) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          const { navigation } = args;
          console.log(
            "register user response :::::::::::: ",
            JSON.stringify(data)
          );

          showSuccessToast(
            i18n.t("congratulations"),
            i18n.t("requestMessages.user_created_successfully")
          );

          navigation.navigate("SignIn");

          dispatch(setLoading(false));
        } catch (e: any) {
          console.log("register user error :::::::::::: ", JSON.stringify(e));
          dispatch(setLoading(false));

          if (e?.meta?.response?.status === 400) {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.invalid_request_data")
            );
          } else if (e?.meta?.response?.status === 409) {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.email_already_use")
            );
          } else {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.something_went_wrong")
            );
          }
        }
      },
    }),
    loginUser: builder.mutation<
      LoginResponse,
      { data: LoginRequest; navigation?: any }
    >({
      query: ({ data }) => {
        return {
          url: userLoginEndPoint,
          method: "post",
          body: data,
        };
      },
      transformResponse: (result: LoginResponse) => result,
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
          dispatch(setRefreshToken(data?.refreshToken));
          showSuccessToast(
            i18n.t("congratulations"),
            i18n.t("requestMessages.user_authenticated_successfully")
          );
        } catch (e: any) {
          console.log(
            "login user response error :::::::::::: ",
            JSON.stringify(e)
          );
          dispatch(setLoading(false));

          if (e?.meta?.response?.status === 401) {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.invalid_credentials")
            );
          } else {
            showErrorToast(
              i18n.t("sorry"),
              e?.error?.data?.message || e?.error?.error
            );
          }
        }
      },
    }),

    updateUser: builder.mutation<UpdateUserResponse, UpdateUserPayload>({
      query: ({ data }) => {
        console.log("data for update user :::: ", JSON.stringify(data));
        return {
          url: "/users/me",
          method: "PATCH",
          body: data,
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { meta, data }: any = await queryFulfilled; // meta has response info
          const status = meta?.response?.status;

          console.log("user data ::: ", JSON.stringify(data));

          if (status === 204) {
            setTimeout(() => {
              showSuccessToast(
                i18n.t("congratulations"),
                i18n.t("requestMessages.user_update_successfully")
              );
            }, 1000);
          }
        } catch (err: any) {
          console.log("Update user error ::::::::::: ", err);
          showErrorToast(i18n.t("sorry"), "Something went wrong!");
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    updateFile: builder.mutation<UploadFileResponse, UploadFilePayload>({
      query: ({ data }) => {
        return {
          url: userFileEndPoint,
          method: "post",
          body: data,
          formData: true,
        };
      },
      transformResponse: (result: UploadFileResponse) => result,
      //   invalidatesTags: ['readUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          console.log(
            "user update file response :::::::::::: ",
            JSON.stringify(data)
          );
        } catch (e: any) {
          console.log(
            "update user file response error :::::::::::: ",
            JSON.stringify(e)
          );
          dispatch(setLoading(false));

          showErrorToast(
            i18n.t("sorry"),
            e?.error?.data?.message || e?.error?.error
          );
          // showErrorToast("Something went wrong");
        }
      },
    }),

    deleteFile: builder.mutation({
      query: ({ id }: any) => {
        console.log("datta ", id);
        return {
          url: `${userFileEndPoint}/${id}`,
          method: "delete",
        };
      },
      transformResponse: (result) => result,
      //   invalidatesTags: ['readUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { navigation } = args;

          dispatch(setLoading(false));
          showSuccessToast(
            i18n.t("congratulations"),
            i18n.t("requestMessages.file_deleted_successfully")
          );
        } catch (e: any) {
          console.log(
            "delete file response error :::::::::::: ",
            JSON.stringify(e)
          );
          dispatch(setLoading(false));

          showErrorToast(
            i18n.t("sorry"),
            e?.error?.data?.message || e?.error?.error
          );
          // showErrorToast("Something went wrong");
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
  //   useForgotPasswordMutation,
  //   useLogoutUserMutation,
} = AuthApi;
