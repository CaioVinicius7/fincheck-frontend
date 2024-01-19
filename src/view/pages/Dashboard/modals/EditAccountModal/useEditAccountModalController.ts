import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { bankAccountsService } from "@services/bankAccountsService";
import type { UpdateBankAccountParams } from "@services/bankAccountsService/update";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";

import { useDashboard } from "../../DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, "Saldo inicial é obrigatório"),
    z.number()
  ]),
  name: z.string().min(1, "Nome da conta é obrigatório"),
  type: z.enum(["CASH", "CHECKING", "INVESTMENT"]),
  color: z.string().min(1, "Cor é obrigatória")
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color
    }
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountsService.update(data);
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success("A conta foi editada com sucesso!");

      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar as alterações!");
    }
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleSubmit,
    register,
    errors,
    control,
    isLoading,
    accountBeingEdited
  };
}
