import type { User } from "@entities/User";

import { httpClient } from "../httpClient";

interface meResponse {
  user: User;
}

export async function me() {
  const { data } = await httpClient.get<meResponse>("/users/me");

  return data;
}
