import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/useAuth";
import { authService } from "@services/authService";
import type { SignUpParams } from "@services/authService/signup";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório."),
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Informe um e-mail válido."),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve conter pelo menos 8 dígitos.")
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignUpParams) => {
      return authService.signUp(data);
    }
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error("Ocorreu um erro ao criar a sua conta!");
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isLoading
  };
}
