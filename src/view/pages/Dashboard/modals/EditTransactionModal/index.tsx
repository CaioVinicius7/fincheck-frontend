import { Controller } from "react-hook-form";

import { Button } from "@components/Button";
import { ConfirmDeleteModal } from "@components/ConfirmDeleteModal";
import { DatePickerInput } from "@components/DatePickerInput";
import { TrashIcon } from "@components/icons/TrashIcon";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import type { Transaction } from "@entities/Transaction";

import { useEditTransactionModalController } from "./useEditTransactionModalController";

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function EditTransactionModal({
  open,
  onClose,
  transaction
}: EditTransactionModalProps) {
  const {
    register,
    control,
    errors,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title={`Tem certeza que deseja excluir essa ${
          isExpense ? "despesa" : "receita"
        }?`}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        isLoading={isLoadingDelete}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={open}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="h-6 w-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">
            Valor da {isExpense ? "despesa" : "receita"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>

            <Controller
              name="value"
              defaultValue="0"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.value?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? "Nome da Despesa" : "Nome da Receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name
                }))}
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
              />
            )}
          />

          <Controller
            name="bankAccountId"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name
                }))}
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="mt-6 w-full">
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
