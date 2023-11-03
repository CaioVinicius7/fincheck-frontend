import { useSwiper } from "swiper/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface AccountSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountSliderNavigation({
  isBeginning,
  isEnd
}: AccountSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        className="rounded-full py-3 pl-3.5 pr-2.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
