import AsciiChart from "asciichart";

import { AccountStore } from "./entities/account.js";
import Person from "./entities/person.js";
import CpfSim from "./simulators/cpf/CpfSim.js";
import { HdbWithHdbLoanSim } from "./simulators/hdb/HdbWithHdbLoanSim.js";
import SimpleExpensesSim from "./simulators/SimpleExpensesSim.js";
import SimpleInvestmentSim from "./simulators/SimpleInvestmentSim.js";
import SimpleSalarySim from "./simulators/SimpleSalarySim.js";

const LIFE_EXPECTANCY = 90;
const START_YEAR = 2021;
const BIRTH_DATE = new Date(1995, 5, 1);

const person = new Person({ birthDate: BIRTH_DATE });
const accountStore = new AccountStore();
accountStore.get("cash").add_entry({ amount: 5000, dateTime: new Date(START_YEAR, 0), title: "initial_cash" })
const baseConfig = { accountStore, person, startDate: new Date(START_YEAR, 0) }

const salarySim = new SimpleSalarySim(baseConfig, { baseSalary: 5000, growthRate: 0.025 });
const expensesSim = new SimpleExpensesSim(baseConfig, { baseExpense: 3000 });
const cpfSalaryContributionSim = new CpfSim({ accountStore, person }, { income: 5000 })
const simpleInvestmentSim = new SimpleInvestmentSim({ accountStore, person }, { monthlyDeposit: 1000, perAnnumInterestRate: 0.05, drawdownRate: 0.03 });
const hdbSim = new HdbWithHdbLoanSim(
  { accountStore, person },
  { downpaymentYear: 2022, purchasePrice: 450000, perAnnumInterestRate: 0.025, loanYears: 15, estimatedTopYear: 2026 }
);


const simulationEndYear = LIFE_EXPECTANCY + BIRTH_DATE.getFullYear();

const initSimulators = (sims, simConfigs, baseConfig) => {
  console.log(sims)
  return sims.map(sim => new sim(baseConfig, simConfigs[sim.name]));
}

const runSimulation = (simulatorClasses, simulatorConfigs, simulationConfig) => {
  // TODO: actually use simulationConfig
  const person = new Person({ birthDate: BIRTH_DATE });
  const accountStore = new AccountStore();
  accountStore.get("cash").add_entry({ amount: 5000, dateTime: new Date(START_YEAR, 0), title: "initial_cash" });
  const baseConfig = { accountStore, person, startDate: new Date(START_YEAR, 0) }

  const simulators = initSimulators(simulatorClasses, simulatorConfigs, baseConfig);

  for (let year = START_YEAR; year <= simulationEndYear; year++) {
    const yearStart = new Date(year, 0);
    simulators.forEach((simulator) => {
      simulator.apply_yearly_updates({ yearStart });
    });

    for (let month = 0; month <= 11; month++) {
      const monthStart = new Date(year, month);
      simulators.forEach((simulator) => {
        simulator.apply_monthly_updates({ monthStart });
      });
      simulators.forEach((simulator) => {
        simulator.apply_monthly_interest({ monthStart });
      });
    }

    simulators.forEach((simulator) => {
      simulator.apply_yearly_interest({ yearStart });
    });
  }

  return accountStore;
}

// Naive Visualisation
const generateAsciiChart = (accountStore) => {
  let dataPoints = [];
  for (let year = START_YEAR; year <= simulationEndYear; year++) {
    const startingBalance = accountStore.accounts.reduce((acc, account) => {
      return acc + account.balance(new Date(year, 0));
    }, 0)
    dataPoints.push(startingBalance);
  }
  return AsciiChart.plot(dataPoints, { height: 5 })

  // accountStore.accounts.forEach(account => {
  //   console.log(account.identifier, account.current_balance());
  // });
}

export { runSimulation, generateAsciiChart }