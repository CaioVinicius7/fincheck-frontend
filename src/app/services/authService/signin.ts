import { httpClient } from "../httpClient";

export interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

export async function signIn({ email, password }: SignInParams) {
  const { data } = await httpClient.post<SignInResponse>("/auth/signin", {
    email,
    password
  });

  return data;
}
