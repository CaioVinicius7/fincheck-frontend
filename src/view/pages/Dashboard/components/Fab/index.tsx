import { PlusIcon } from "@radix-ui/react-icons";

import { DropdownMenu } from "@components/DropdownMenu";
import { BankAccountIcon } from "@components/icons/BankAccountIcon";
import { CategoryIcon } from "@components/icons/categories/CategoryIcon";

import { useDashboard } from "../../DashboardContext/useDashboard";

export function Fab() {
  const { openNewAccountModal } = useDashboard();

  return (
    <div className="fixed bottom-4 right-4 ">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white">
            <PlusIcon className="h-6 w-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mb-2 mr-4">
          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2">
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item onSelect={openNewAccountModal} className="gap-2">
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
