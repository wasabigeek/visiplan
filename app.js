import { AccountStore } from "./account.js";
import { CpfSim } from "./simulators/cpf/index.js";
import { SimpleInvestmentSim } from "./simulators/SimpleInvestmentSim.js";

const accountStore = new AccountStore(); // pass in person?
// TODO: should pass in DOB instead
const cpfSim = new CpfSim({ accountStore }, { age: 35, income: 5000 })
const simpleInvestmentSim = new SimpleInvestmentSim({ accountStore }, { monthly_deposit: 1000, per_annum_interest_rate: 0.06 })

const simulators = [
  cpfSim,
  simpleInvestmentSim,
]

for (let year = 2021; year <= 2021; year++) {
  for (let month = 0; month <= 11; month++) {
    const monthStart = new Date(year, month);
    simulators.forEach((simulator) => {
      simulator.apply_monthly_updates({ monthStart });
    });
    simulators.forEach((simulator) => {
      simulator.apply_monthly_interest({ monthStart });
    });
  }
  const yearStart = new Date(year, 0);
  simulators.forEach((simulator) => {
    simulator.apply_yearly_updates({ yearStart });
  });
  simulators.forEach((simulator) => {
    simulator.apply_yearly_interest({ yearStart });
  });
}

console.log(accountStore.get('cpf_oa').current_balance());
console.log(accountStore.get('simple_investments').current_balance());
console.log(accountStore.get('cpf_oa').entries)
console.log(accountStore.get('simple_investments').entries)