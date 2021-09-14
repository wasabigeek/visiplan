import { AccountStore } from "./account.js";
import { CpfComponent } from "./cpf/index.js";
import { SimpleInvestmentComponent } from "./simpleInvestmentComponent.js";

const accountStore = new AccountStore(); // pass in person?
// TODO: should pass in DOB instead
const cpfComponent = new CpfComponent(accountStore, { age: 35, income: 5000 })
const simpleInvestmentComponent = new SimpleInvestmentComponent(accountStore, { monthly_deposit: 1000, per_annum_interest_rate: 0.06 })

for (let year = 2021; year <= 2021; year++) {
  for (let month = 1; month <= 12; month++) {
    // pass in year and month
    cpfComponent.apply_monthly_updates();
    // pass in year and month
    // refactor to await: must wait for yearly updates to be applied first
    cpfComponent.apply_monthly_interest();
  }
  simpleInvestmentComponent.apply_yearly_updates();
  simpleInvestmentComponent.apply_yearly_interest();
}

console.log(accountStore.get('cpf_oa').current_balance());
console.log(accountStore.get('simple_investments').current_balance());
console.log(accountStore.get('simple_investments').entries)