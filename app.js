import { AccountStore } from "./account.js";
import { CpfComponent } from "./cpf.js";

const accountStore = new AccountStore(); // pass in person?
const cpfComponent = new CpfComponent(accountStore, { age: 35, income: 5000 })

for (let year = 0; year < 2023; year++) {
  cpfComponent.apply_yearly_updates();
  // refactor to await: must wait for yearly updates to be applied first
  cpfComponent.apply_yearly_interest();
}

console.log(accountStore.get('cpf_oa').current_balance());
