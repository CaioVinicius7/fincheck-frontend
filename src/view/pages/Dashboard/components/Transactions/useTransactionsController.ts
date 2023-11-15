import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: true
  };
}
