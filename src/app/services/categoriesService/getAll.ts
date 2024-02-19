import type { Category } from "@entities/Category";

import { httpClient } from "../httpClient";

type CategoriesResponse = Category[];

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");

  return data;
}
