import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import type { Transaction } from "@entities/Transaction";
import { useBankAccounts } from "@hooks/useBankAccounts";
import { useCategories } from "@hooks/useCategories";
import { transactionsService } from "@services/transactionsService";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";

const schema = z.object({
  value: z.union([z.string().min(1, "Informe o valor"), z.number()]),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe a conta"),
  date: z.date()
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction.date) : new Date()
    },
    resolver: zodResolver(schema)
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { mutateAsync: updateTransaction, isPending: isLoading } = useMutation({
    mutationFn: transactionsService.update
  });

  const { mutateAsync: removeTransaction, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: transactionsService.remove
    });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );

      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao salvar a despesa!"
          : "Erro ao salvar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction?.type]);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "A despesa foi deletada com sucesso!"
          : "A receita foi deletada com sucesso!"
      );

      onClose();
    } catch {
      toast.success(
        transaction!.type === "EXPENSE"
          ? "Erro ao deletar a despesa!"
          : "Erro ao deletar a receita!"
      );
    }
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete
  };
}
