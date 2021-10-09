import BaseSim from "../BaseSim.js";
import { roundMoney } from "../../helpers.js";
import { calculateOaContribution } from "./calculateOaContribution.js";
import { calculateTotalCpfContribution } from "./calculateTotalCpfContribution.js";

export const TITLES = {
  cpf_interest: "cpf_interest"
}

export class CpfSalaryContributionSim extends BaseSim {
  apply_monthly_updates(options) {
    const { accountStore, person } = this.baseConfig;
    const { monthStart } = options;

    if (person.is_retired(monthStart)) { return; }

    const salaryEntry = this._getSalaryForMonth(accountStore, monthStart);
    const totalCpfContribution = calculateTotalCpfContribution({
      age: person.age(monthStart),
      ordinary_wages: salaryEntry.amount
    });
    accountStore.add_entry(
      "cpf_oa",
      {
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

    // naively skip calculation if account balance is negative, might want to relook this handling
    const cpfOaBalance = accountStore.get_current_balance("cpf_oa");
    if (cpfOaBalance > 0) {
      accountStore.add_entry(
        "cpf_oa",
        {
          amount: roundMoney(cpfOaBalance * 0.025 / 12),
          dateTime: monthStart,
          title: TITLES.cpf_interest
        }
      )
    }
  }

  _getSalaryForMonth(accountStore, monthStart) {
    return accountStore.get("cash").entries.find(entry => {
      return entry.title == 'salary' &&
        entry.dateTime.getFullYear() == monthStart.getFullYear() &&
        entry.dateTime.getMonth() == monthStart.getMonth()
    })
  }
}
