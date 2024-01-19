import { Controller } from "react-hook-form";

import { Button } from "@components/Button";
import { ColorsDropdownInput } from "@components/ColorsDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";

import { useEditAccountModalController } from "./useEditAccountModalController";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    handleSubmit,
    register,
    errors,
    control,
    isLoading
  } = useEditAccountModalController();

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">
            Saldo inicial
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>

            <Controller
              name="initialBalance"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                placeholder="Tipo"
                error={errors.type?.message}
                options={[
                  {
                    value: "CHECKING",
                    label: "Conta Corrente"
                  },
                  {
                    value: "INVESTMENT",
                    label: "Investimentos"
                  },
                  {
                    value: "CASH",
                    label: "Dinheiro Físico"
                  }
                ]}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ColorsDropdownInput
                value={value}
                onChange={onChange}
                error={errors.color?.message}
              />
            )}
          />
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-6 w-full">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
