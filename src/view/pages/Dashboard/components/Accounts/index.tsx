import { Swiper, SwiperSlide } from "swiper/react";

import { EyeIcon } from "../../../../Components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from "./AccountSliderNavigation";

import "swiper/css";
import { useAccountsController } from "./useAccountsController";

export function Accounts() {
  const { sliderState, setSliderState } = useAccountsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      <div>
        <span className="block tracking-[-0.5px] text-white">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>

          <button className="flex h-8 w-8 items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
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

              <AccountSliderNavigation
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
    </div>
  );
}
