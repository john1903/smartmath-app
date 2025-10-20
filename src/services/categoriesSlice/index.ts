import { GetCategoriesEndPoint } from "../../config/endPoints";
import i18n from "../../i18n/i18n";
import { GetCategoriesResponse } from "../../models/Categories";
import { setAllCategories } from "../../store/categories";

import { setLoading } from "../../store/loading";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

import { api } from "../api";

export const CategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => {
        let params = `?page=0&size=500&sort=asc`;
        return {
          url: `${GetCategoriesEndPoint}${params}`,
          method: "get",
        };
      },

      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }: any) {
        try {
          const res = await queryFulfilled;

          // console.log(" categories res :::::::>>>>  ", JSON.stringify(res));

          dispatch(setAllCategories(res?.data?.content));

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

export const { useLazyGetCategoriesQuery } = CategoriesApi;
