import BaseSim from "../BaseSim.js";
import { MonthlyAmortisedLoan } from "../MonthlyAmortisedLoan.js";

const TITLES = {
  option: 'option',
  downpayment: 'downpayment',
  monthly_payment: 'monthly_payment'
}
export { TITLES };

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
    const { downpaymentYear, purchasePrice, perAnnumInterestRate, loanYears, estimatedTopYear } = this.userConfig;

    const cashAccount = accountStore.get('cash');
    const cpfOaAccount = accountStore.get('cpf_oa');

    if (yearStart.getFullYear() == downpaymentYear) {
      // option
      cashAccount.add_entry({
        amount: -2000,
        dateTime: yearStart,
        title: TITLES.option
      });

      // downpayment, assuming maximum from CPF
      // TODO: other costs and fees e.g. stamp duty
      // TODO: how will this work with more than one buyer?
      const downpayment = purchasePrice * 0.10;
      // TODO: option to set aside 20k
      const cpfUsed = Math.min(cpfOaAccount.current_balance(), downpayment);
      cpfOaAccount.add_entry({
        amount: -1 * cpfUsed,
        dateTime: yearStart,
        title: TITLES.downpayment
      });

      const cashUsed = downpayment - cpfUsed;
      if (cashUsed > 0) {
        cashAccount.add_entry({
          amount: -1 * cashUsed,
          dateTime: yearStart,
          title: TITLES.downpayment
        })
      }
    }

    if (yearStart.getFullYear() >= estimatedTopYear) {
      const loan = new MonthlyAmortisedLoan(purchasePrice * 0.90, perAnnumInterestRate, loanYears);
      // TODO: handle existing CPF
      cpfOaAccount.add_entry({
        amount: -1 * loan.monthly_payment(),
        dateTime: yearStart,
        title: TITLES.monthly_payment
      });
    }
  }
}
