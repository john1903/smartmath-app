import { GetPromptsEndPoint } from "../../config/endPoints";

import { setLoading } from "../../store/loading";

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
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const res = await queryFulfilled;

          console.log(" prompts res :::::::>>>>  ", JSON.stringify(res));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetPromptsQuery } = PromptsApi;
