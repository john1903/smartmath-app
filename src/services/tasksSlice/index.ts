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
      query: ({
        page = 0,
        size = 20,
        query,
        status,
        difficultyLevel,
        exerciseType,
        categoryId,
      }) => {
        let params = `?page=${page}&size=${size}&sort=id`;

        if (query) params += `&query=${encodeURIComponent(query)}`;
        if (status && status !== "all") params += `&statusEqual=${status}`;
        if (difficultyLevel)
          params += `&difficultyLevelEqual=${difficultyLevel}`;
        if (exerciseType) params += `&exerciseTypeEqual=${exerciseType}`;
        if (categoryId) params += `&categoryIdEqual=${categoryId}`;

        console.log("params ::::::::: ", params);

        return {
          url: `${ExerciseEndPoint}${params}`,
          method: "get",
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const newData = res?.data?.content || [];

          const currentData = getState()?.tasks?.allExercise || [];

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
          }, 4000);
        } catch (error) {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 4000);
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
        const from = payload.from ?? "";
        const to = payload.to ?? "";

        console.log(
          "calenday from and to payload ",
          `${userExerciseStatusEndPoint}?from=${from}&to=${to}`
        );
        return {
          url: `${userExerciseStatusEndPoint}?from=${from}&to=${to}`,
          method: "get",
        };
      },

      providesTags: [{ type: "submitAnswer", id: 1 }],
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          // dispatch(setLoading(true));
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
