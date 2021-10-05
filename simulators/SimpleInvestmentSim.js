import BaseSim from "./BaseSim.js";

export default class SimpleInvestmentSim extends BaseSim {
  apply_yearly_updates({ yearStart }) {
    const { accountStore, person } = this.baseConfig;
    const { monthlyDeposit } = this.userConfig;

    if (person.is_retired(yearStart)) {
      return;
    }

    const investmentAccount = accountStore.get('simple_investments');

    investmentAccount.add_entry({
      amount: monthlyDeposit * 12,
      dateTime: yearStart
    });
  }

  apply_yearly_interest({ yearStart }) {
    const { accountStore } = this.baseConfig;
    const { perAnnumInterestRate } = this.userConfig;

    const investmentAccount = accountStore.get('simple_investments');
    const interest = investmentAccount.current_balance() * perAnnumInterestRate;

    investmentAccount.add_entry({
      amount: interest,
      dateTime: yearStart
    });

  }
}
