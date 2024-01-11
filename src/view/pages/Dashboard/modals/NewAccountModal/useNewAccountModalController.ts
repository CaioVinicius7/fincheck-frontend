import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { bankAccountsService } from "@services/bankAccountsService";
import { CreateBankAccountParams } from "@services/bankAccountsService/create";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";

import { useDashboard } from "../../DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.enum(["CASH", "CHECKING", "INVESTMENT"]),
  color: z.string().min(1, "Cor é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: "0",
      type: "CHECKING",
      color: ""
    }
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: CreateBankAccountParams) => {
      return bankAccountsService.create(data);
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance)
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("Conta cadastrada com sucesso!");

      closeNewAccountModal();

      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    handleSubmit,
    register,
    errors,
    control,
    isLoading
  };
}
