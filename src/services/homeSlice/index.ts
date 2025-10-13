import {
  recommendedExerciseEndPoint,
  userDetailEndPoint,
} from "../../config/endPoints";
import { setUser } from "../../store/auth";
import { setAllRecommendedExercise } from "../../store/home";
import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const HomeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userDetail: builder.query({
      query: (payload) => {
        return {
          url: userDetailEndPoint,
          method: "get",
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          // console.log("user res :::::::>>>>  ", JSON.stringify(res?.data));
          dispatch(setUser(res?.data));
          dispatch(setLoading(false));
        } catch (error) {
          // console.log("user res :::::::>>>>  ", JSON.stringify(error));

          dispatch(setLoading(false));
        }
      },
    }),
    getAllRecommendedExercise: builder.query({
      query: (payload) => {
        return {
          url: recommendedExerciseEndPoint,
          method: "get",
        };
      },
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          // dispatch(setLoading(true));
          const res = await queryFulfilled;

          // console.log(
          //   " recommended exercise res :::::::>>>>  ",
          //   JSON.stringify(res?.data)
          // );
          dispatch(setAllRecommendedExercise(res?.data));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyUserDetailQuery, useLazyGetAllRecommendedExerciseQuery } =
  HomeApi;
