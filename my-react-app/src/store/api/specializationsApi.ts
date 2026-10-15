import { baseApi } from "./baseApi.js";
import type { Specialization } from "../../types/filters.js";

export interface SpecializationsResponse {
  data: Specialization[];
  page: number;
  limit: number;
  total: number;
}

export const specializationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specialization[], number | void>({
      async queryFn(_, _api, _extraOptions, baseQuery) {
        const limit = 100;

        const firstResult = await baseQuery({
          url: "specializations",
          params: {
            page: 1,
            limit,
          },
        });

        if (firstResult.error) {
          return { error: firstResult.error };
        }

        const firstResponse = firstResult.data as SpecializationsResponse;

        const allSpecializations = [...firstResponse.data];

        const totalPages = Math.ceil(firstResponse.total / firstResponse.limit);

        for (let page = 2; page <= totalPages; page++) {
          const result = await baseQuery({
            url: "specializations",
            params: {
              page,
              limit,
            },
          });

          if (result.error) {
            return { error: result.error };
          }

          const response = result.data as SpecializationsResponse;

          allSpecializations.push(...response.data);
        }

        return {
          data: allSpecializations,
        };
      },
    }),
  }),
});

export const { useGetSpecializationsQuery } = specializationsApi;
