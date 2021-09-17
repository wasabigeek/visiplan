import BaseSim from "./BaseSim.js";

export class SimpleInvestmentSim extends BaseSim {
  apply_yearly_updates({ yearStart }) {
    const { accountStore, person } = this.baseConfig;
    const { monthly_deposit, retirementAge } = this.userConfig;

    if (person.age(yearStart) >= retirementAge) {
      return;
    }

    const investmentAccount = accountStore.get('simple_investments');

    investmentAccount.add_entry({
      amount: monthly_deposit * 12,
      dateTime: yearStart
    });
  }

  apply_yearly_interest({ yearStart }) {
    const { accountStore } = this.baseConfig;
    const { per_annum_interest_rate } = this.userConfig;

    const investmentAccount = accountStore.get('simple_investments');
    const interest = investmentAccount.current_balance() * per_annum_interest_rate;

    investmentAccount.add_entry({
      amount: interest,
      dateTime: yearStart
    });

  }
}
