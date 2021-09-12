const roundMoney = (amount) => {
  return Math.round(amount * 100) / 100
}

// https://www.cpf.gov.sg/Assets/employers/Documents/Table%2011_Pte%20and%20Npen_CPF%20Allocation%20Rates%20Jan%202016.pdf
export const calculateMonthlyCpfOaContribution = (age, totalCpfContribution) => {
  let contribution = 0;

  if (age > 65) {
    contribution = 0.08 * totalCpfContribution;
  } else if (age > 60) {
    contribution = 0.2122 * totalCpfContribution;
  } else if (age > 55) {
    contribution = 0.4616 * totalCpfContribution;
  } else if (age > 50) {
    contribution = 0.4055 * totalCpfContribution;
  } else if (age > 45) {
    contribution = 0.5136 * totalCpfContribution;
  } else if (age > 35) {
    contribution = 0.5677 * totalCpfContribution;
  } else {
    contribution = 0.6217 * totalCpfContribution;
  }
  return { amount: roundMoney(contribution), dateTime: new Date() }
}

const getCpfInterest = ({ accountStore }) => {

}

export class CpfComponent {
  constructor(accountStore, config) {
    this.accountStore = accountStore;
    this.config = config;
  }

  apply_monthly_updates() {
    const cpfOa = this.accountStore.get('cpf_oa');
    cpfOa.add_entry(
      calculateMonthlyCpfOaContribution(
        this.config.age,
        // this is a naive calculation, should be: https://www.cpf.gov.sg/Assets/employers/Documents/Table%201_Pte%20and%20Npen%20CPF%20contribution%20rates%20for%20Singapore%20Citizens%20and%203rd%20year%20SPR%20Jan%202016.pdf
        this.config.income * 0.37
      )
    );
  }

  apply_monthly_interest() {
    getCpfInterest({ accountStore: this.accountStore })
  }
}
