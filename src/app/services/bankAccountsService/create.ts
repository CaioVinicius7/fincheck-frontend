import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "CASH" | "CHECKING" | "INVESTMENT";
}

interface CreateBankAccountResponse {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: "CASH" | "CHECKING" | "INVESTMENT";
  color: string;
}

export async function create({
  name,
  initialBalance,
  color,
  type
}: CreateBankAccountParams) {
  const { data } = await httpClient.post<CreateBankAccountResponse>(
    "/bank-accounts",
    {
      name,
      initialBalance,
      color,
      type
    }
  );

  return data;
}
