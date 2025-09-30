import { GetReportEndPoint } from "../../config/endPoints";

import { setLoading } from "../../store/loading";
import { setAllReports } from "../../store/reports";

import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { api, formHeader } from "../api";

export const ReportsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: (payload) => {
        return {
          url: GetReportEndPoint,
          method: "get",
        };
      },
      providesTags: ["Reports"],
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          console.log(" reports res :::::::>>>>  ", JSON.stringify(res?.data));
          dispatch(setAllReports(res?.data?.content));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
    }),

    generateReport: builder.mutation({
      query: (payload: any) => {
        return {
          url: GetReportEndPoint,
          method: "post",
          body: payload?.data,
        };
      },
      transformResponse: (result) => result,
      invalidatesTags: ["Reports"],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const res = await queryFulfilled;
          console.log(
            " generate reports res :::::::>>>>  ",
            JSON.stringify(res)
          );

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
  }),
  overrideExisting: true,
});

export const {
  useLazyGetAllReportsQuery,

  useGenerateReportMutation,
} = ReportsApi;
