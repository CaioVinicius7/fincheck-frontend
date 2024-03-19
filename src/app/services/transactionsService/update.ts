import { httpClient } from "@services/httpClient";

interface updateTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function update({
  id,
  bankAccountId,
  categoryId,
  name,
  value,
  date,
  type
}: updateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, {
    bankAccountId,
    categoryId,
    name,
    value,
    date,
    type
  });

  return data;
}
