import BaseSim from "../BaseSim.js";
import { calculateOaContribution } from "./calculateOaContribution.js";
import { calculateTotalCpfContribution } from "./calculateTotalCpfContribution.js";

const getCpfInterest = ({ accountStore }) => {

}

export class CpfSim extends BaseSim {
  apply_monthly_updates(options) {
    const { monthStart } = options;

    const cpfOa = this.accountStore.get('cpf_oa');
    const totalCpfContribution = calculateTotalCpfContribution({
      age: this.config.age,
      ordinary_wages: this.config.income
    });
    cpfOa.add_entry({
      amount: calculateOaContribution(
        this.config.age, // should be derived
        totalCpfContribution
      ),
      dateTime: monthStart
    }
    );
  }

  apply_monthly_interest() {
    getCpfInterest({ accountStore: this.accountStore })
  }
}
