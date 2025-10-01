// services/reportSlice/generateReport.ts
import { GetReportEndPoint } from "../../config/endPoints";
import { setLoading } from "../../store/loading";
import { showErrorToast } from "../../utils/toast";
import { ReportsApi } from "./index"; // 👈 import your main slice

export default (build: any) =>
  build.mutation({
    query: (payload: any) => ({
      url: GetReportEndPoint,
      method: "POST",
      body: payload?.data,
    }),
    invalidatesTags: [{ type: "reports", id: 1 }],
    async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
      dispatch(setLoading(true));

      try {
        const res = await queryFulfilled;
        console.log("✅ generate reports res :::::::>>>>", res);

        // 🔄 Trigger fresh reports fetch
        dispatch(
          ReportsApi.endpoints.getAllReports.initiate(undefined, {
            forceRefetch: true,
          })
        );

        dispatch(setLoading(false));
      } catch (err) {
        console.log("❌ generate report error", err);
        dispatch(setLoading(false));
        showErrorToast("Something went wrong");
      }
    },
  });
