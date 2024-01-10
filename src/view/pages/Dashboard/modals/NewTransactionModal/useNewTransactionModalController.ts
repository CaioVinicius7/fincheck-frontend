import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal
  } = useDashboard();

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal
  };
}
