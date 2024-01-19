import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";

import { cn } from "@utils/cn";

interface InputCurrencyProps {
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
}

export function InputCurrency({ value, onChange, error }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "w-full text-[32px] font-bold tracking-[-1px] text-gray-800 outline-none",
          !!error && "text-red-500"
        )}
      />

      {!!error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
