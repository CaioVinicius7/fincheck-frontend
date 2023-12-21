import { NumericFormat } from "react-number-format";

export function InputCurrency() {
  return (
    <NumericFormat
      defaultValue={0}
      thousandSeparator="."
      decimalSeparator=","
      className="w-full text-[32px] font-bold tracking-[-1px] text-gray-800 outline-none"
    />
  );
}
