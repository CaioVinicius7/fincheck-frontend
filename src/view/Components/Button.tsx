import type { ComponentProps } from "react";

import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  isLoading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        "flex h-12 items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white outline-none transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        className
      )}
    >
      {!isLoading ? children : <Spinner className="h-6 w-6" />}
    </button>
  );
}
