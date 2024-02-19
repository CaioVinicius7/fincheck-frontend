import { useQuery } from "@tanstack/react-query";

import { categoryService } from "@services/categoriesService";

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll
  });

  return {
    categories: data ?? [],
    isFetching
  };
}
