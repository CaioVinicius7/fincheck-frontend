import type { Transaction } from "@entities/Transaction";
import { httpClient } from "@services/httpClient";

interface TransactionsFilter {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction["type"];
}

type TransactionsResponse = Transaction[];

export async function getAll(filters: TransactionsFilter) {
  const { data } = await httpClient.get<TransactionsResponse>("/transactions", {
    params: filters
  });

  return data;
}
