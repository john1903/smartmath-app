import { GetReportEndPoint } from "../../config/endPoints";
import i18n from "../../i18n/i18n";
import { setLoading } from "../../store/loading";
import { setAllReports } from "../../store/reports";
import { showErrorToast } from "../../utils/toast";

export default (build: any) =>
  build.query({
    // ✅ Accept params like { page, size }
    query: (params: { page?: number; size?: number } = {}) => {
      const { page = 0, size = 20 } = params;
      return {
        url: `${GetReportEndPoint}?page=${page}&size=${size}`,
        method: "GET",
      };
    },

    providesTags: [{ type: "reports", id: 1 }],

    async onQueryStarted(
      arg: any,
      { dispatch, queryFulfilled, getState }: any
    ) {
      // dispatch(setLoading(true));
      try {
        const res = await queryFulfilled;
        const newData = res?.data?.content || [];

        // ✅ Get existing data
        const currentData = getState()?.reports?.allReports || [];

        // ✅ Append if page > 0 else replace
        if (arg.page > 0) {
          dispatch(setAllReports([...currentData, ...newData]));
        } else {
          dispatch(setAllReports(newData));
        }

        // console.log(
        //   "✅ reports fetch response ::::::::: ",
        //   JSON.stringify(res)
        // );
      } catch (e: any) {
        console.log(" reports fetch error", e);
        if (e?.meta?.response?.status === 400) {
          showErrorToast(i18n.t("requestMessages.invalid_request_parameters"));
        } else if (e?.meta?.response?.status === 401) {
          showErrorToast(i18n.t("requestMessages.unauthorized"));
        } else {
          showErrorToast(e?.error?.data?.message || e?.error?.error);
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
  });
