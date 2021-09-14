export class SimpleInvestmentComponent {
  constructor(accountStore, config) {
    this.accountStore = accountStore;
    this.config = config;
  }

  apply_yearly_updates() {
    const { monthly_deposit } = this.config;

    const investmentAccount = this.accountStore.get('simple_investments');

    investmentAccount.add_entry({
      amount: monthly_deposit * 12,
      dateTime: new Date()
    });
  }

  apply_yearly_interest() {
    const { per_annum_interest_rate } = this.config;

    const investmentAccount = this.accountStore.get('simple_investments');
    const interest = investmentAccount.current_balance() * per_annum_interest_rate;

    investmentAccount.add_entry({
      amount: interest,
      dateTime: new Date()
    });

  }
}
