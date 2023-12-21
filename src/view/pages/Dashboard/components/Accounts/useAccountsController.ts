import { useState } from "react";

import { useWindowWidth } from "@hooks/useWindowWidth";
import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
    openNewAccountModal
  };
}
