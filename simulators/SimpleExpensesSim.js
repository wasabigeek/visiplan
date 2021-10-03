import { roundMoney } from "../helpers.js";
import BaseSim from "./BaseSim.js";

export const TITLES = {
  monthly_expenses: "monthly_expenses"
}

export default class SimpleExpensesSim extends BaseSim {
  apply_monthly_updates({ monthStart }) {
    const { accountStore, startDate } = this.baseConfig;
    const { baseExpense, inflationRate = 0.025 } = this.userConfig;

    const cashAccount = accountStore.get('cash');

    const yearsPassed = monthStart.getFullYear() - startDate.getFullYear();
    cashAccount.add_entry({
      amount: -1 * roundMoney(baseExpense * (1 + inflationRate) ** yearsPassed),
      dateTime: monthStart,
      title: TITLES.monthly_expenses
    });
  }
}