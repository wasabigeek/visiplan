import { AccountStore } from "./account.js";
import Person from "./person.js";
import { CpfSim } from "./simulators/cpf/index.js";
import { SimpleInvestmentSim } from "./simulators/SimpleInvestmentSim.js";

const person = new Person(new Date(2000, 5, 1));
const accountStore = new AccountStore();
// TODO: maybe we can "curry" as the baseConfig is pretty much fixed at this point
const cpfSim = new CpfSim({ accountStore, person }, { income: 5000 })
const simpleInvestmentSim = new SimpleInvestmentSim({ accountStore, person }, { monthly_deposit: 1000, per_annum_interest_rate: 0.06 })

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