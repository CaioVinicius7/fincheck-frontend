import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { EyeIcon } from "../../../Components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

export function Accounts() {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      <div>
        <span className="block tracking-[-0.5px] text-white">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>

          <button className="flex h-8 w-8 items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="text-lg font-bold tracking-[-1px] text-white">
            Minhas contas
          </strong>

          <div>
            <button className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            <button className="rounded-full py-3 pl-3.5 pr-2.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <AccountCard
            color="#7950f2"
            name="Nubank"
            balance={1000.5}
            type="CASH"
          />
        </div>
      </div>
    </div>
  );
}
