import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon
} from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { useState } from "react";

import { cn } from "@utils/cn";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
}

export function Select({
  className,
  error,
  placeholder,
  options
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<null | string>(null);

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-700",
            !!selectedValue &&
              "left-[13px] top-2 translate-y-0 text-xs transition-all"
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              "relative h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left text-gray-800 outline-none transition-all focus:border-gray-800",
              !!error && "!border-red-900",
              className
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="h-6 w-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer rounded-lg p-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 data-[state=checked]:font-bold"
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {!!error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
