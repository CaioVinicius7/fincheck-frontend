import { useEffect, useState } from "react";

import { useTransactions } from "@hooks/useTransactions";
import { useDashboard } from "@pages/Dashboard/DashboardContext/useDashboard";
import type { TransactionsFilters } from "@services/transactionsService/getAll";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeMonth(month: number) {
    setFilters((prevState) => ({
      ...prevState,
      month
    }));
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeMonth
  };
}
