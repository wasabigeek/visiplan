import BaseSim from "./BaseSim.js";

export const TITLES = {
  interest: "interest"
}

export default class SimpleInvestmentSim extends BaseSim {
  apply_monthly_updates({ monthStart }) {
    const { accountStore, person } = this.baseConfig;
    const { monthlyDeposit, drawdownRate } = this.userConfig;

    if (person.is_retired(monthStart)) {
      this._drawdown(accountStore, monthStart, drawdownRate);
    } else {
      this._deposit(accountStore, monthStart, monthlyDeposit);
    }
  }

  apply_yearly_interest({ yearStart }) {
    const { accountStore } = this.baseConfig;
    const { perAnnumInterestRate } = this.userConfig;

    const investmentBalance = accountStore.get_current_balance("simple_investments");
    if (investmentBalance <= 0) { return; }

    const interest = investmentBalance * perAnnumInterestRate;

    accountStore.add_entry(
      "simple_investments",
      {
        amount: interest,
        dateTime: yearStart,
        title: TITLES.interest
      }
    );
  }

  _drawdown(accountStore, monthStart, drawdownRate) {
    const drawdownAmount = drawdownRate * accountStore.get_current_balance("simple_investments");
    accountStore.add_entry(
      "simple_investments",
      {
        amount: -1 * drawdownAmount,
        dateTime: monthStart
      }
    );
    accountStore.add_entry(
      "cash",
      {
        amount: drawdownAmount,
        dateTime: monthStart
      }
    );
  }

  _deposit(accountStore, monthStart, monthlyDeposit) {
    const cashBalance = accountStore.get_current_balance("cash");
    if (cashBalance <= 0) { return; }

    const depositAmount = Math.min(cashBalance, monthlyDeposit)

    accountStore.add_entry(
      "cash",
      {
        amount: -1 * depositAmount,
        dateTime: monthStart
      }
    );
    accountStore.add_entry(
      "simple_investments",
      {
        amount: depositAmount,
        dateTime: monthStart
      }
    );
  }
}
