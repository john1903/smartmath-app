import { GetPromptsEndPoint } from "../../config/endPoints";
import i18n from "../../i18n/i18n";

import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

import { api } from "../api";

export const PromptsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPrompts: builder.query({
      query: (payload) => {
        return {
          url: GetPromptsEndPoint,
          method: "get",
        };
      },
      providesTags: [{ type: "reports", id: 1 }],
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }: any) {
        try {
          // dispatch(setLoading(true));
          const res = await queryFulfilled;

          // console.log(" prompts res :::::::>>>>  ", JSON.stringify(res));

          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1500);
        } catch (e: any) {
          dispatch(setLoading(false));
          if (e?.meta?.response?.status === 401) {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.unauthorized")
            );
          } else if (e?.meta?.response?.status === 404) {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.token_usage_data_not_found")
            );
          } else {
            showErrorToast(
              i18n.t("sorry"),
              i18n.t("requestMessages.something_went_wrong")
            );
          }
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetPromptsQuery } = PromptsApi;
