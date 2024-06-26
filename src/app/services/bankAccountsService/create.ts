import type { BankAccount } from "@entities/BankAccount";

import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "CASH" | "CHECKING" | "INVESTMENT";
}

type CreateBankAccountResponse = BankAccount[];

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
