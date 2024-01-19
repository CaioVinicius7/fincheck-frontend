import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  title,
  description,
  onConfirm,
  onClose,
  isLoading
}: ConfirmDeleteModalProps) {
  return (
    <Modal open onClose={onClose} title="Excluir">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-red-50">
          <TrashIcon className="h-6 w-6 text-red-900" />
        </div>

        <p className="max-w-[180px] font-bold tracking-[-0.5px] text-gray-800">
          {title}
        </p>

        {!!description && (
          <p className="tracking-[-0.5px] text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
          className="w-full"
        >
          Sim, desejo excluir
        </Button>

        <Button
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
          className="w-full"
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
