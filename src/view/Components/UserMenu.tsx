import { ExitIcon } from "@radix-ui/react-icons";

import { useAuth } from "@hooks/useAuth";

import { DropdownMenu } from "./DropdownMenu";

export function UserMenu() {
  const { signOut } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-teal-100 bg-teal-50">
          <span className="select-none text-sm font-medium tracking-[-0.5px] text-teal-900">
            CV
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          onSelect={signOut}
          className="flex items-center justify-between"
        >
          Sair
          <ExitIcon className="h-4 w-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
