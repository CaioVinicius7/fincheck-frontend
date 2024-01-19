import type { BankAccount } from "@entities/BankAccount";

import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "CASH" | "CHECKING" | "INVESTMENT";
}

type UpdateBankAccountResponse = BankAccount[];

export async function update({
  id,
  name,
  initialBalance,
  color,
  type
}: UpdateBankAccountParams) {
  const { data } = await httpClient.put<UpdateBankAccountResponse>(
    `/bank-accounts/${id}`,
    {
      name,
      initialBalance,
      color,
      type
    }
  );

  return data;
}
