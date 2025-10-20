import { GetReportEndPoint } from "../../config/endPoints";
import i18n from "../../i18n/i18n";
import { setLoading } from "../../store/loading";
import { setAllReports } from "../../store/reports";
import { showErrorToast } from "../../utils/toast";

export default (build: any) =>
  build.query({
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
      try {
        const res = await queryFulfilled;

        // console.log("report screen data ::::::: ", JSON.stringify(res));
        const newData = res?.data?.content || [];
        const currentData = getState()?.reports?.allReports || [];

        if (arg.page > 0) {
          dispatch(setAllReports([...currentData, ...newData]));
        } else {
          dispatch(setAllReports(newData));
        }
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
