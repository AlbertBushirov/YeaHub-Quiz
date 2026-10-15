import { baseApi } from "./baseApi.js";
import type { Skill } from "@/types/filters.js";

interface SkillsResponse {
  data: Skill[];
  limit: number;
  page: number;
  total: number;
}

interface SkillsParams {
  spec?: number;
}

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query<Skill[], SkillsParams>({
      async queryFn({ spec }, _api, _extraOptions, baseQuery) {
        const limit = 100;

        const firstResult = await baseQuery({
          url: "skills",
          params: {
            page: 1,
            limit,
            ...(spec !== undefined && {
              specializations: spec,
            }),
          },
        });

        if (firstResult.error) {
          return { error: firstResult.error };
        }

        const firstResponse = firstResult.data as SkillsResponse;

        const allSkills = [...firstResponse.data];

        const totalPages = Math.ceil(firstResponse.total / firstResponse.limit);

        for (let page = 2; page <= totalPages; page++) {
          const result = await baseQuery({
            url: "skills",
            params: {
              page,
              limit,
              ...(spec !== undefined && {
                specializations: spec,
              }),
            },
          });

          if (result.error) {
            return { error: result.error };
          }

          const response = result.data as SkillsResponse;

          allSkills.push(...response.data);
        }

        return {
          data: allSkills,
        };
      },
    }),
  }),
});

export const { useGetSkillsQuery } = skillsApi;
