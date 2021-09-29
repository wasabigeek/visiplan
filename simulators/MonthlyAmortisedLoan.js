import { roundMoney } from "./helpers.js"

export class MonthlyAmortisedLoan {
  constructor(principal, perAnnumInterestRate, years) {
    this.originalPrincipal = principal;
    this.perAnnumInterestRate = perAnnumInterestRate;
    this.totalYears = years;
  }

  monthly_payment() {
    const months = this.totalYears * 12;
    const periodicInterestRate = this.perAnnumInterestRate / 12;
    const tmpNum = periodicInterestRate * ((1 + periodicInterestRate) ** months);
    const tmpDen = (1 + periodicInterestRate) ** months - 1
    return roundMoney(this.originalPrincipal * (tmpNum / tmpDen));
  }
}