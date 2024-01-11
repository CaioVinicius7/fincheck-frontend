import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useWindowWidth } from "@hooks/useWindowWidth";
import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";
import { bankAccountsService } from "@services/bankAccountsService";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const { data, isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal
  };
}
