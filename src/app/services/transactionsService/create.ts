import { httpClient } from "@services/httpClient";

interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function create({
  bankAccountId,
  categoryId,
  name,
  value,
  date,
  type
}: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", {
    bankAccountId,
    categoryId,
    name,
    value,
    date,
    type
  });

  return data;
}
