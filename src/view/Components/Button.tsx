import type { ComponentProps } from "react";

import { cn } from "@utils/cn";

import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  isLoading,
  disabled,
  className,
  children,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        "flex h-12 items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white outline-none transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "border border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800/5",
        className
      )}
    >
      {!isLoading ? children : <Spinner className="h-6 w-6" />}
    </button>
  );
}
