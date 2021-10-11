import BaseSim from "../BaseSim.js";
import { CpfSalaryContributionSim } from "./CpfSalaryContributionSim";
import retirementSumTransferBreakdown from "./retirementSumTransferBreakdown.js";

export default class CpfSim extends BaseSim {
  constructor(baseConfig, userConfig) {
    super(baseConfig, userConfig);
    this.childSims = [new CpfSalaryContributionSim(baseConfig, userConfig)];
  }

  yearly_update_hook({ yearStart }) {
    const { accountStore, person } = this.baseConfig;

    if (person.age(yearStart) == 55) {
      const { amountFromOrdinaryAccount, amountFromSpecialAccount } = retirementSumTransferBreakdown({
        ordinaryAccountBalance: accountStore.get_current_balance("cpf_oa"),
        specialAccountBalance: accountStore.get_current_balance("cpf_sa"),
        transferYear: yearStart.getFullYear()
        // TODO: allow choosing of different retirement sum types
      });

      accountStore.add_entry("cpf_oa", { amount: -1 * amountFromOrdinaryAccount, dateTime: yearStart });
      accountStore.add_entry("cpf_sa", { amount: -1 * amountFromSpecialAccount, dateTime: yearStart });
      accountStore.add_entry("cpf_ra", { amount: amountFromSpecialAccount + amountFromOrdinaryAccount, dateTime: yearStart });
    }
  }
}