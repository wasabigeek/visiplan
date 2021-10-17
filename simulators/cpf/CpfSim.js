import { roundMoney } from "../../helpers.js";
import BaseSim from "../BaseSim.js";
import { CpfSalaryContributionSim, TITLES as CPF_SALARY_TITLES } from "./CpfSalaryContributionSim";
import retirementSumTransferBreakdown from "./retirementSumTransferBreakdown.js";

export const TITLES = Object.assign({
  cpf_retirement_sum: "cpf_retirement_sum",
  cpf_life_payout: "cpf_life_payout",
}, CPF_SALARY_TITLES);

export default class CpfSim extends BaseSim {
  apply_yearly_updates({ yearStart }) {
    const { accountStore, person } = this.baseConfig;

    if (person.age(yearStart) == 55) {
      const { amountFromOrdinaryAccount, amountFromSpecialAccount } = retirementSumTransferBreakdown({
        ordinaryAccountBalance: accountStore.get_current_balance("cpf_oa"),
        specialAccountBalance: accountStore.get_current_balance("cpf_sa"),
        transferYear: yearStart.getFullYear()
        // TODO: allow choosing of different retirement sum types
      });

      accountStore.add_entry("cpf_oa", { amount: -1 * amountFromOrdinaryAccount, dateTime: yearStart, title: TITLES.cpf_retirement_sum });
      accountStore.add_entry("cpf_sa", { amount: -1 * amountFromSpecialAccount, dateTime: yearStart, title: TITLES.cpf_retirement_sum });
    }
  }

  apply_monthly_updates(options) {
    const { accountStore, person } = this.baseConfig;

    new CpfSalaryContributionSim(this.baseConfig, this.userConfig).apply_monthly_updates(options);

    const { monthStart } = options;
    if (person.is_retired(monthStart)) {
      // TODO: make the cpf life payouts vary based on RA amount
      const cpfLifeAmount = 1.03 ** (person.retirement_year - 2021) * 1430;
      accountStore.add_entry("cash", { amount: roundMoney(cpfLifeAmount, { toInteger: true }), dateTime: monthStart, title: TITLES.cpf_life_payout });
    }
  }

  apply_monthly_interest(options) {
    new CpfSalaryContributionSim(this.baseConfig, this.userConfig).apply_monthly_interest(options);
  }
}