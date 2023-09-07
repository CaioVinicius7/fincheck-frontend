import { httpClient } from "../httpClient";

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export async function signUp({ name, email, password }: SignUpParams) {
  const { data } = await httpClient.post<SignUpResponse>("/auth/signup", {
    name,
    email,
    password
  });

  return data;
}
