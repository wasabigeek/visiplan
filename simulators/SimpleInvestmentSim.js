import BaseSim from "./BaseSim.js";

export class SimpleInvestmentSim extends BaseSim {
  apply_yearly_updates({ yearStart }) {
    const { monthly_deposit } = this.config;

    const investmentAccount = this.accountStore.get('simple_investments');

    investmentAccount.add_entry({
      amount: monthly_deposit * 12,
      dateTime: yearStart
    });
  }

  apply_yearly_interest({ yearStart }) {
    const { per_annum_interest_rate } = this.config;

    const investmentAccount = this.accountStore.get('simple_investments');
    const interest = investmentAccount.current_balance() * per_annum_interest_rate;

    investmentAccount.add_entry({
      amount: interest,
      dateTime: yearStart
    });

  }
}
