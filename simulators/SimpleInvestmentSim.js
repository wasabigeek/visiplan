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

    const investmentAccount = accountStore.get('simple_investments');
    const investmentBalance = investmentAccount.current_balance();
    if (investmentBalance <= 0) {
      return;
    }

    const interest = investmentBalance * perAnnumInterestRate;

    investmentAccount.add_entry({
      amount: interest,
      dateTime: yearStart,
      title: TITLES.interest
    });
  }

  _drawdown(accountStore, monthStart, drawdownRate) {
    const investmentAccount = accountStore.get('simple_investments');
    const drawdownAmount = drawdownRate * investmentAccount.current_balance();
    investmentAccount.add_entry({
      amount: -1 * drawdownAmount,
      dateTime: monthStart
    });
    accountStore.get('cash').add_entry({
      amount: drawdownAmount,
      dateTime: monthStart
    })
  }

  _deposit(accountStore, monthStart, monthlyDeposit) {
    const cashAccount = accountStore.get('cash');
    const cashBalance = cashAccount.current_balance();
    if (cashBalance <= 0) {
      return;
    }

    const depositAmount = Math.min(cashBalance, monthlyDeposit)

    cashAccount.add_entry({
      amount: -1 * depositAmount,
      dateTime: monthStart
    });
    const investmentAccount = accountStore.get('simple_investments');
    investmentAccount.add_entry({
      amount: depositAmount,
      dateTime: monthStart
    });
  }
}
