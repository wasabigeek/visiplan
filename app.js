import { AccountStore } from "./account.js";
import { CpfComponent } from "./cpf/index.js";
import { SimpleInvestmentComponent } from "./simpleInvestmentComponent.js";

const accountStore = new AccountStore(); // pass in person?
// TODO: should pass in DOB instead
const cpfComponent = new CpfComponent(accountStore, { age: 35, income: 5000 })
const simpleInvestmentComponent = new SimpleInvestmentComponent(accountStore, { monthly_deposit: 1000, per_annum_interest_rate: 0.06 })

const components = [
  cpfComponent,
  simpleInvestmentComponent,
]

for (let year = 2021; year <= 2021; year++) {
  for (let month = 0; month <= 11; month++) {
    const monthStart = new Date(year, month);
    components.forEach((component) => {
      component.apply_monthly_updates({ monthStart });
    });
    components.forEach((component) => {
      component.apply_monthly_interest({ monthStart });
    });
  }
  const yearStart = new Date(year, 0);
  components.forEach((component) => {
    component.apply_yearly_updates({ yearStart });
  });
  components.forEach((component) => {
    component.apply_yearly_interest({ yearStart });
  });
}

console.log(accountStore.get('cpf_oa').current_balance());
console.log(accountStore.get('simple_investments').current_balance());
console.log(accountStore.get('cpf_oa').entries)
console.log(accountStore.get('simple_investments').entries)