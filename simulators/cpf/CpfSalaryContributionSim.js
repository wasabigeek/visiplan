import BaseSim from "../BaseSim.js";
import { roundMoney } from "../helpers.js";
import { calculateOaContribution } from "./calculateOaContribution.js";
import { calculateTotalCpfContribution } from "./calculateTotalCpfContribution.js";

export const TITLES = {
  cpf_interest: "cpf_interest"
}

export class CpfSalaryContributionSim extends BaseSim {
  apply_monthly_updates(options) {
    const { accountStore, person } = this.baseConfig;
    const { income } = this.userConfig;
    const { monthStart } = options;

    if (person.is_retired(monthStart)) {
      return;
    }

    const cpfOa = accountStore.get('cpf_oa');
    const totalCpfContribution = calculateTotalCpfContribution({
      age: person.age(monthStart),
      ordinary_wages: income
    });
    cpfOa.add_entry({
      amount: calculateOaContribution(
        person.age(monthStart),
        totalCpfContribution
      ),
      dateTime: monthStart
    }
    );
  }

  apply_monthly_interest({ monthStart }) {
    const { accountStore } = this.baseConfig;
    const cpfOaAccount = accountStore.get('cpf_oa');

    // naively skip calculation if account balance is negative, might want to relook this handling
    if (cpfOaAccount.current_balance() > 0) {
      cpfOaAccount.add_entry({
        amount: roundMoney(cpfOaAccount.current_balance() * 0.025 / 12),
        dateTime: monthStart,
        title: TITLES.cpf_interest
      })
    }
  }
}
