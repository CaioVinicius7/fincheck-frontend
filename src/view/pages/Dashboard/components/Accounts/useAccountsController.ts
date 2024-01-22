import { useMemo, useState } from "react";

import { useBankAccounts } from "@hooks/useBankAccounts";
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

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    if (!accounts) {
      return 0;
    }

    return accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance
  };
}
