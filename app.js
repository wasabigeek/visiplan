import { AccountStore } from "./account.js";
import { CpfComponent } from "./cpf.js";

const accountStore = new AccountStore(); // pass in person?
const cpfComponent = new CpfComponent(accountStore)

for (let year = 0; year < 2023; year++) {
  cpfComponent.apply_yearly_updates();
  cpfComponent.apply_yearly_interest();
}

console.log(accountStore.get('cpf_oa').current_balance());
