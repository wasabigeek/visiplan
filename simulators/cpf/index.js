import BaseSim from "../BaseSim.js";
import { calculateOaContribution } from "./calculateOaContribution.js";
import { calculateTotalCpfContribution } from "./calculateTotalCpfContribution.js";

const getCpfInterest = ({ accountStore }) => {

}

export class CpfSim extends BaseSim {
  apply_monthly_updates(options) {
    const { accountStore } = this.baseConfig;
    const { monthStart } = options;

    const cpfOa = accountStore.get('cpf_oa');
    const totalCpfContribution = calculateTotalCpfContribution({
      age: this.userConfig.age,
      ordinary_wages: this.userConfig.income
    });
    cpfOa.add_entry({
      amount: calculateOaContribution(
        this.userConfig.age, // should be derived
        totalCpfContribution
      ),
      dateTime: monthStart
    }
    );
  }

  apply_monthly_interest() {
    const { accountStore } = this.baseConfig;

    getCpfInterest({ accountStore })
  }
}
