import { ChevronDownIcon } from "@radix-ui/react-icons";

import { FilterIcon } from "@components/icons/FilterIcon";
import { TransactionsIcon } from "@components/icons/TransactionsIcon";

export function Transactions() {
  return (
    <div className="h-full w-full rounded-2xl bg-gray-100 px-4 py-8 md:p-10">
      <header>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button>
            <FilterIcon />
          </button>
        </div>
      </header>

      <div className="mt-4">Content</div>
    </div>
  );
}
