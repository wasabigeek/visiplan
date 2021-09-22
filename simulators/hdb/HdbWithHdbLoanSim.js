import BaseSim from "../BaseSim.js";

export class HdbWithHdbLoanSim extends BaseSim {
  // "Inputs"
  // Flat Cost
  // TOP date
  // Future: Stamp duty

  // "Withdrawals"
  // option 2k (onetime) - cash only
  // downpayment ~5-10% (onetime) - cash + cpf
  // loan payment - cash + cpf

  apply_yearly_updates({ yearStart }) {
    const { accountStore } = this.baseConfig;
    const { downpaymentYear, purchasePrice } = this.userConfig;

    const cashAccount = accountStore.get('cash');
    const cpfOaAccount = accountStore.get('cpf_oa');

    if (yearStart.getFullYear() == downpaymentYear) {
      // option
      cashAccount.add_entry({
        amount: 2000,
        dateTime: yearStart
      });

      // downpayment, assuming maximum from CPF
      // TODO: other costs and fees e.g. stamp duty
      // TODO: how will this work with more than one buyer?
      const downpayment = purchasePrice * 0.10;
      // TODO: option to set aside 20k
      const cpfUsed = Math.min(cpfOaAccount.current_balance(), downpayment);
      cpfOaAccount.add_entry({
        amount: -1 * cpfUsed,
        dateTime: yearStart
      });

      const cashUsed = downpayment - cpfUsed;
      if (cashUsed > 0) {
        cashAccount.add_entry({
          amount: -1 * cashUsed,
          dateTime: yearStart
        })
      }
    }
  }
}
