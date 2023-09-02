import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "h-12 rounded-2xl bg-teal-900 px-6 font-medium text-white outline-none transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        className
      )}
    />
  );
}
