import { Swiper, SwiperSlide } from "swiper/react";

import { EyeIcon } from "@components/icons/EyeIcon";
import { Spinner } from "@components/Spinner";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";

import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";

import "swiper/css";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading
  } = useAccountsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10 fill-white text-teal-950/50" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="block tracking-[-0.5px] text-white">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md"
                )}
              >
                {formatCurrency(1000)}
              </strong>

              <button
                onClick={toggleValuesVisibility}
                className="flex h-8 w-8 items-center justify-center"
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-1 flex-col justify-end md:mt-0">
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                onSlideChange={(swiper) => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd
                  });
                }}
              >
                <div
                  slot="container-start"
                  className="mb-4 flex items-center justify-between"
                >
                  <strong className="text-lg font-bold tracking-[-1px] text-white">
                    Minhas contas
                  </strong>

                  <SliderNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
                </div>

                <SwiperSlide>
                  <AccountCard
                    color="#7950f2"
                    name="Nubank"
                    balance={1000.5}
                    type="CASH"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <AccountCard
                    color="#7950f2"
                    name="XP"
                    balance={1000.5}
                    type="INVESTMENT"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <AccountCard
                    color="#7950f2"
                    name="Carteira"
                    balance={1000.5}
                    type="CHECKING"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
