import { BankAccountTypeIcon } from "@components/icons/BankAccountTypeIcon";
import type { BankAccount } from "@entities/BankAccount";
import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";

interface AccountCard {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCard) {
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  const { color, name, currentBalance, type } = data;

  return (
    <div
      role="button"
      onClick={() => openEditAccountModal(data)}
      className="flex h-[200px] flex-col justify-between rounded-2xl border-b-4 border-teal-950 bg-white p-4"
      style={{
        borderColor: color
      }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="mt-4 block font-medium tracking-[-0.5px] text-gray-800">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "block font-medium tracking-[-0.5px] text-gray-800",
            !areValuesVisible && "blur-sm"
          )}
        >
          {formatCurrency(currentBalance)}
        </span>

        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
