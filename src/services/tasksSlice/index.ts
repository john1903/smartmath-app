import {
  ExerciseEndPoint,
  SingleExerciseEndPoint,
  userExerciseStatusEndPoint,
} from "../../config/endPoints";

import { setLoading } from "../../store/loading";
import { setAllExercise } from "../../store/tasks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const TasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllExercise: builder.query({
      query: ({ page = 0, size = 10 }) => ({
        url: `${ExerciseEndPoint}?page=${page}&size=${size}`,
        method: "get",
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          // dispatch(setLoading(true));
          const res = await queryFulfilled;
          const newData = res?.data?.content || [];

          // ✅ Get existing data
          const currentData = getState()?.tasks?.allExercise || [];

          // ✅ Append if page > 0 else replace
          if (arg.page > 0) {
            dispatch(setAllExercise([...currentData, ...newData]));
          } else {
            dispatch(setAllExercise(newData));
          }

          dispatch(setLoading(false));
        } catch (error) {
          console.log("getAllExercise error", error);
          dispatch(setLoading(false));
        }
      },
    }),
    getExercise: builder.query({
      query: (payload) => {
        return {
          url: `${SingleExerciseEndPoint}/${payload?.id}`,
          method: "get",
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          console.log("exercise question :::::: ", JSON.stringify(res?.data));

          setTimeout(() => {
            dispatch(setLoading(false));
          }, 2000);
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
    }),

    submitExerciseAnswer: builder.mutation({
      query: (payload: any) => {
        return {
          url: `${SingleExerciseEndPoint}/${payload?.id}/answers`,
          method: "put",
          body: payload?.data,
        };
      },
      transformResponse: (result) => result,
      invalidatesTags: [{ type: "submitAnswer", id: 1 }],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const { navigation } = args;

          dispatch(setLoading(false));
          // showSuccessToast("Submit answer successful!");
        } catch (e: any) {
          dispatch(setLoading(false));

          console.log("error submit answer ::: ", JSON.stringify(e));

          //   errorMessage(e?.error?.data?.message || e?.error?.error);
          showErrorToast("Something went wrong");
        }
      },
    }),

    getUserExerciseStatus: builder.query({
      query: (payload) => {
        // console.log("calenday from and to payload ", payload);
        return {
          url: `${userExerciseStatusEndPoint}?from=${payload?.from}&to=${payload?.to}`,
          method: "get",
        };
      },

      providesTags: [{ type: "submitAnswer", id: 1 }],
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          console.log(
            " exercise statusssssssssssssssssssssssssssssss res :::::::>>>>  ",
            JSON.stringify(res?.data)
          );

          dispatch(setLoading(false));
        } catch (error) {
          // console.log(
          //   "recommended exercise res error :::::::>>>>  ",
          //   JSON.stringify(error)
          // );
          dispatch(setLoading(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllExerciseQuery,
  useLazyGetExerciseQuery,
  useSubmitExerciseAnswerMutation,
  useLazyGetUserExerciseStatusQuery,
} = TasksApi;
