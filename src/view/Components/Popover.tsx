import * as RdxPopover from "@radix-ui/react-popover";
import { ReactNode } from "react";

import { cn } from "@utils/cn";

function PopoverRoot({ children }: { children: ReactNode }) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({ children }: { children: ReactNode }) {
  return <RdxPopover.Trigger asChild>{children}</RdxPopover.Trigger>;
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          "z-[99] space-y-2 rounded-2xl bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
};
