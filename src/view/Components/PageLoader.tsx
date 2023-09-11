import { Spinner } from "./Spinner";

export function PageLoader() {
  return (
    <div className="fixed left-0 top-0 grid h-full w-full place-items-center bg-gray-0">
      <Spinner />
    </div>
  );
}
