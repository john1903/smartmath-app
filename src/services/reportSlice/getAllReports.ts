// services/reportSlice/getAllReports.ts
import { GetReportEndPoint } from "../../config/endPoints";
import { setLoading } from "../../store/loading";
import { setAllReports } from "../../store/reports";

export default (build: any) =>
  build.query({
    query: () => ({
      url: GetReportEndPoint,
      method: "GET",
    }),
    providesTags: [{ type: "reports", id: 1 }],
    async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
      dispatch(setLoading(true));
      try {
        const response = await queryFulfilled;
        console.log("✅ reports fetch response ::::::::: ", response);
        dispatch(setAllReports(response?.data?.content));
      } catch (err) {
        console.log("❌ reports fetch error", err);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
