import { Button } from "@components/Button";
import { DatePickerInput } from "@components/DatePickerInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";

import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">
            Valor da {isExpense ? "despesa" : "receita"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
          />

          <Select
            placeholder="Categoria"
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

          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
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

          <DatePickerInput />
        </div>

        <Button type="submit" className="mt-6 w-full">
          Criar
        </Button>
      </form>
    </Modal>
  );
}
