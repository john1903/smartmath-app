import {
  ExerciseEndPoint,
  SingleExerciseEndPoint,
} from "../../config/endPoints";

import { setLoading } from "../../store/loading";
import { setAllExercise } from "../../store/tasks";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const TasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllExercise: builder.query({
      query: (payload) => {
        return {
          url: ExerciseEndPoint,
          method: "get",
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          //   console.log(" exercise res :::::::>>>>  ", JSON.stringify(res?.data));
          dispatch(setAllExercise(res?.data?.content));
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

          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllExerciseQuery, useLazyGetExerciseQuery } = TasksApi;
