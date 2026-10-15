import { useGetSpecializationsQuery } from "@/store/api/specializationsApi.js";

export const useSpecializations = () => {
  const {
    data: specs = [],
    isLoading: isSpecsLoading,
    isError: isSpecsError,
  } = useGetSpecializationsQuery();

  return {
    specs,
    isSpecsLoading,
    isSpecsError,
  };
};
