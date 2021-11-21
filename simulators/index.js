import CpfSim from "./cpf/CpfSim.js";
import { HdbWithHdbLoanSim } from "./hdb/HdbWithHdbLoanSim.js";
import SimpleExpensesSim from "./SimpleExpensesSim.js";
import SimpleInvestmentSim from "./SimpleInvestmentSim.js";
import SimpleSalarySim from "./SimpleSalarySim.js";

export const defaultSimulatorClasses = [
  SimpleSalarySim,
  SimpleExpensesSim,
  CpfSim,
  SimpleInvestmentSim,
  HdbWithHdbLoanSim,
]

export const defaultSimulatorConfigs = {
  SimpleSalarySim: { baseSalary: 5000, growthRate: 0.025 },
  SimpleExpensesSim: { baseExpense: 3000 },
  CpfSim: { income: 5000 },
  SimpleInvestmentSim: { monthlyDeposit: 1000, perAnnumInterestRate: 0.05, drawdownRate: 0.03 },
  HdbWithHdbLoanSim: { downpaymentYear: 2022, purchasePrice: 450000, perAnnumInterestRate: 0.025, loanYears: 15, estimatedTopYear: 2026 }
}
