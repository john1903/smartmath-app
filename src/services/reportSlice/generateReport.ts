import { GetReportEndPoint } from "../../config/endPoints";
import { setLoading } from "../../store/loading";
import { showErrorToast } from "../../utils/toast";

export default (build: any) =>
  build.mutation({
    query: (payload: any) => ({
      url: GetReportEndPoint,
      method: "POST",
      body: payload?.data,
    }),

    // This automatically triggers getAllReports refetch (no manual call needed)
    invalidatesTags: [{ type: "reports", id: 1 }],

    async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
      try {
        const res = await queryFulfilled;
        console.log(" generate reports res :::::::>>>>", res);
      } catch (err) {
        console.log("generate report error", err);
        showErrorToast("Something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
