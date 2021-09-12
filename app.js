import { AccountStore } from "./account.js";
import { CpfComponent } from "./cpf.js";

const accountStore = new AccountStore(); // pass in person?
// TODO: should pass in DOB instead
const cpfComponent = new CpfComponent(accountStore, { age: 35, income: 5000 })

for (let year = 2021; year <= 2021; year++) {
  for (let month = 1; month <= 12; month++) {
    // pass in year and month
    cpfComponent.apply_monthly_updates();
    // pass in year and month
    // refactor to await: must wait for yearly updates to be applied first
    cpfComponent.apply_monthly_interest();
  }
}

console.log(accountStore.get('cpf_oa').current_balance());
