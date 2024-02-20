import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { useBankAccounts } from "@hooks/useBankAccounts";
import { useCategories } from "@hooks/useCategories";
import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";
import { transactionsService } from "@services/transactionsService";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";

const schema = z.object({
  value: z.string().min(1, "Informe o valor"),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Informe a conta"),
  date: z.date()
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    defaultValues: {
      value: "0",
      name: "",
      bankAccountId: "",
      categoryId: "",
      date: new Date()
    },
    resolver: zodResolver(schema)
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { isLoading, mutateAsync } = useMutation(transactionsService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString()
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );

      closeNewTransactionModal();

      reset();
    } catch {
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrada a despesa!"
          : "Erro ao cadastrada a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading
  };
}
