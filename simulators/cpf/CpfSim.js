import BaseSim from "../BaseSim.js";
import { CpfSalaryContributionSim } from "./CpfSalaryContributionSim";

export default class CpfSim extends BaseSim {
  apply_monthly_updates(options) {
    new CpfSalaryContributionSim(this.baseConfig, this.userConfig).apply_monthly_updates(options);
  }

  apply_monthly_interest(options) {
    new CpfSalaryContributionSim(this.baseConfig, this.userConfig).apply_monthly_interest(options);
  }
}