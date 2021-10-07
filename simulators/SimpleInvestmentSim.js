import BaseSim from "./BaseSim.js";

export const TITLES = {
  interest: "interest"
}

export default class SimpleInvestmentSim extends BaseSim {
  apply_monthly_updates({ monthStart }) {
    const { accountStore, person } = this.baseConfig;
    const { monthlyDeposit, drawdownRate } = this.userConfig;

    if (person.is_retired(monthStart)) {
      const investmentAccount = accountStore.get('simple_investments');
      investmentAccount.add_entry({
        amount: -1 * drawdownRate * investmentAccount.current_balance(),
        dateTime: monthStart
      });
      return;
    }

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
}
