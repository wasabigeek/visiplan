import { calculateOaContribution } from "./calculateOaContribution.js";

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
      calculateOaContribution(
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
