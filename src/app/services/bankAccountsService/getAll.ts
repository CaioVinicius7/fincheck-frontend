import { httpClient } from "../httpClient";

type BankAccountResponse = Array<{
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  type: "CASH" | "CHECKING" | "INVESTMENT";
  color: string;
}>;

export async function getAll() {
  const { data } = await httpClient.get<BankAccountResponse>("/bank-accounts");

  return data;
}
