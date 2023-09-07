import { Link } from "react-router-dom";

import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px] text-gray-900">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-700">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="font-medium tracking-[-0.5px] text-teal-900"
          >
            Fazer Login
          </Link>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  );
}
