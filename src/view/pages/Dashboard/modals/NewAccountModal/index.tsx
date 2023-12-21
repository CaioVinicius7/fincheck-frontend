import { Button } from "@components/Button";
import { ColorsDropdownInput } from "@components/ColorsDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";

import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController();

  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder="Nome da conta"
          />

          <Select
            placeholder="Tipo"
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

          <ColorsDropdownInput />
        </div>

        <Button type="submit" className="mt-6 w-full">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
