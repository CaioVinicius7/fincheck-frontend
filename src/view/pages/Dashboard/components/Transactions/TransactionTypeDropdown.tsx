import { ChevronDownIcon } from "@radix-ui/react-icons";

import { DropdownMenu } from "@components/DropdownMenu";
import { ExpensesIcon } from "@components/icons/ExpensesIcon";
import { IncomeIcon } from "@components/icons/IncomeIcon";
import { TransactionsIcon } from "@components/icons/TransactionsIcon";

interface TransactionTypeDropdownProps {
  selectedType: "INCOME" | "EXPENSE" | undefined;
  onSelect: (type: "INCOME" | "EXPENSE" | undefined) => void;
}

export function TransactionTypeDropdown({
  selectedType,
  onSelect
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === "INCOME" && <IncomeIcon />}
          {selectedType === "EXPENSE" && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
            {selectedType === "INCOME" && "Receitas"}
            {selectedType === "EXPENSE" && "Despesas"}
            {selectedType === undefined && "Transações"}
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item
          onSelect={() => onSelect("INCOME")}
          className="gap-2"
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => onSelect("EXPENSE")}
          className="gap-2"
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          onSelect={() => onSelect(undefined)}
          className="gap-2"
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
