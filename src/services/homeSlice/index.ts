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
    //     userDetail: builder.mutation({
    //       query: ({ data }: any) => {
    //         return {
    //           url: userDetailEndPoint,
    //           method: "get",
    //           body: data,
    //         };
    //       },
    //       transformResponse: (result) => result,
    //       //   invalidatesTags: ['readUser'],
    //       async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //           const { navigation } = args;

    //           console.log(
    //             "user detail response :::::::::::: ",
    //             JSON.stringify(data)
    //           );

    //           dispatch(setLoading(false));
    //           dispatch(setUser(data));
    //           //   showSuccessToast("Login successful!");
    //         } catch (e: any) {
    //           console.log(" user response error :::::::::::: ", JSON.stringify(e));
    //           dispatch(setLoading(false));

    //           //   errorMessage(e?.error?.data?.message || e?.error?.error);
    //           showErrorToast("Something went wrong");
    //         }
    //       },
    //     }),
    //   }),
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
          dispatch(setLoading(true));
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
