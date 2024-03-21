import * as RdxDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";

import { cn } from "@utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  rightAction?: ReactNode;
  children: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  rightAction,
  children
}: ModalProps) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-overlay-show"
          )}
        />

        <RdxDialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[51] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-10 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none",
            "data-[state=open]:animate-content-show"
          )}
        >
          <header className="flex h-12 items-center justify-between text-gray-800">
            <button
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center outline-none"
            >
              <Cross2Icon className="h-6 w-6" />
            </button>

            <span className="text-lg font-bold tracking-[-1px]">{title}</span>

            <div className="flex h-12 w-12 items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
