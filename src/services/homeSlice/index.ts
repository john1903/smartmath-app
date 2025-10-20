import {
  recommendedExerciseEndPoint,
  userDetailEndPoint,
} from "../../config/endPoints";
import {
  mapRecommendedExerciseResponse,
  RecommendedExerciseModel,
} from "../../models/RecommendedExercise";
import { mapUserDetailResponse, UserModel } from "../../models/User";
import { setUser } from "../../store/auth";
import { setAllRecommendedExercise } from "../../store/home";
import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const HomeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userDetail: builder.query<UserModel, void>({
      query: () => {
        return {
          url: userDetailEndPoint,
          method: "get",
        };
      },
      transformResponse: (response: any) => mapUserDetailResponse(response),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log("user detail error :::::::>>>>", error);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
    getAllRecommendedExercise: builder.query<RecommendedExerciseModel[], void>({
      query: () => {
        return {
          url: recommendedExerciseEndPoint,
          method: "get",
        };
      },
      transformResponse: (response: any) =>
        mapRecommendedExerciseResponse(response),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllRecommendedExercise(data));
        } catch (error) {
          console.log("Recommended exercise error :::::::>>>>", error);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyUserDetailQuery, useLazyGetAllRecommendedExerciseQuery } =
  HomeApi;
