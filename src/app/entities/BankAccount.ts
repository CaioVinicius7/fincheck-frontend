export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  type: "CASH" | "CHECKING" | "INVESTMENT";
  color: string;
}
