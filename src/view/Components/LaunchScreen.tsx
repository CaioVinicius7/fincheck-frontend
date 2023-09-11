import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

export function LaunchScreen() {
  return (
    <div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-teal-900">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-10 text-white" />

        <Spinner className="fill-white text-teal-900" />
      </div>
    </div>
  );
}
