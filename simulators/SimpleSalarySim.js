import BaseSim from "./BaseSim.js";

export const TITLES = {
  salary: "salary"
}

export default class SimpleSalarySim extends BaseSim {
  apply_monthly_updates({ monthStart }) {
    const { accountStore, person, startDate } = this.baseConfig;
    const { baseSalary, growthRate = 0 } = this.userConfig;

    if (person.is_retired(monthStart)) {
      return;
    }

    const yearsPassed = monthStart.getFullYear() - startDate.getFullYear();
    accountStore.get('cash').add_entry({
      amount: baseSalary * ((1 + growthRate) ** yearsPassed),
      dateTime: monthStart,
      title: TITLES.salary
    });
  }
}