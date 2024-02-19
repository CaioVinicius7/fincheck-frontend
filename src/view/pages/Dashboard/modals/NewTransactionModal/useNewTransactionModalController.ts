import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";

const schema = z.object({
  value: z.string().min(1, "Informe o valor"),
  name: z.string().min(1, "Informe o nome"),
  categoryId: z.string().min(1, "Informe a categoria"),
  bankAccountId: z.string().min(1, "Cor é obrigatória"),
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
    control
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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    register,
    errors,
    control,
    handleSubmit
  };
}
