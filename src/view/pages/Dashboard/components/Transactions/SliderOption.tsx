import { useSwiper } from "swiper/react";

import { cn } from "@utils/cn";

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        "h-12 w-full rounded-full text-sm font-medium tracking-[-0.5px] text-gray-800",
        isActive && "bg-white"
      )}
    >
      {month}
    </button>
  );
}
