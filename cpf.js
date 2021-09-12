const roundMoney = (amount) => {
  return Math.round(amount * 100) / 100
}

// https://www.cpf.gov.sg/Assets/employers/Documents/Table%2011_Pte%20and%20Npen_CPF%20Allocation%20Rates%20Jan%202016.pdf
export const calculateMonthlyCpfOaContribution = (age, income) => {
  let contribution = 0;

  if (age > 65) {
    contribution = 0.08 * income;
  } else if (age > 60) {
    contribution = 0.2122 * income;
  } else if (age > 55) {
    contribution = 0.4616 * income;
  } else if (age > 50) {
    contribution = 0.4055 * income;
  } else if (age > 45) {
    contribution = 0.5136 * income;
  } else if (age > 35) {
    contribution = 0.5677 * income;
  } else {
    contribution = 0.6217 * income;
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
    cpfOa.add_entry(calculateMonthlyCpfOaContribution(this.config.age, this.config.income));
  }

  apply_monthly_interest() {
    getCpfInterest({ accountStore: this.accountStore })
  }
}
