import { AccountStore } from "../entities/account.js";
import SimpleExpensesSim, { TITLES } from "./SimpleExpensesSim.js"

describe("apply_monthly_updates()", () => {
  test("sets expenses at the base value for the first year", () => {
    const accountStore = new AccountStore();
    const startDate = new Date(2022, 0);
    const sim = new SimpleExpensesSim({ accountStore, startDate }, { baseExpense: 2000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const cashAccount = accountStore.get("cash").entries;
    const expenseEntry = cashAccount.find(entry => entry.title == TITLES.monthly_expenses);
    expect(expenseEntry.amount).toEqual(-2000);
  });

  test("adjusts for inflation", () => {
    const accountStore = new AccountStore();
    const startDate = new Date(2022, 0);
    const sim = new SimpleExpensesSim({ accountStore, startDate }, { baseExpense: 2000 });

    sim.apply_monthly_updates({ monthStart: new Date(2024, 7, 14) });

    const cashAccount = accountStore.get("cash").entries;
    const expenseEntry = cashAccount.find(entry => entry.title == TITLES.monthly_expenses);
    expect(expenseEntry.amount).toEqual(-2101.25);
  });
});