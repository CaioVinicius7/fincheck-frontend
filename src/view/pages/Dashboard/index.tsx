import { Logo } from "../../Components/Logo";
import { UserMenu } from "../../Components/UserMenu";

export function Dashboard() {
  return (
    <div className="flex h-full w-full flex-col px-8 pb-8 pt-6">
      <header className="flex h-12 items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main>content</main>
    </div>
  );
}
