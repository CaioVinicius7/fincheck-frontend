import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";

import emptyStateImage from "@assets/empty-state.svg";
import { CategoryIcon } from "@components/icons/categories/CategoryIcon";
import { FilterIcon } from "@components/icons/FilterIcon";
import { TransactionsIcon } from "@components/icons/TransactionsIcon";
import { Spinner } from "@components/Spinner";
import { MONTHS } from "@config/constants";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";

import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactionsController";

export function Transactions() {
  const { areValuesVisible, isLoading, transactions } =
    useTransactionsController();

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 px-4 py-8 md:p-10">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
            {transactions.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center">
                <img src={emptyStateImage} alt="Empty state" />

                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {transactions.length > 0 && (
              <>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="block font-bold tracking-[-0.5px]">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">15/11/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium tracking-[-0.5px] text-red-800",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4">
                  <div className="flex flex-1 items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="block font-bold tracking-[-0.5px]">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">15/11/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium tracking-[-0.5px] text-green-800",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    {formatCurrency(123)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
