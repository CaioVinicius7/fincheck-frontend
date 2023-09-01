import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export function Input({ name, placeholder, id, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        className="peer h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-gray-800 outline-none transition-all placeholder-shown:pt-0 focus:border-gray-800"
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
      >
        {placeholder}
      </label>
    </div>
  );
}
