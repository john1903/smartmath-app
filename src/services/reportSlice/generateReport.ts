import { GetReportEndPoint } from "../../config/endPoints";
import {
  GenerateReportPayload,
  GenerateReportResponse,
} from "../../models/Report";
import { setLoading } from "../../store/loading";
import { showErrorToast } from "../../utils/toast";

export default (build: any) =>
  build.mutation<GenerateReportResponse, { data: GenerateReportPayload }>({
    query: (payload) => ({
      url: GetReportEndPoint,
      method: "POST",
      body: payload?.data,
    }),

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
