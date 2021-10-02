import { roundMoney } from "../helpers.js";

export default class SimpleSalary {
  constructor({ startingSalary, startingYear, growthRate = 0.02, endYear }) {
    this.startingSalary = startingSalary;
    this.startingYear = startingYear;
    this.growthRate = growthRate;
    this.endYear = endYear;
  }

  current(currentDate) {
    if (currentDate.getFullYear() >= this.endYear) {
      return 0;
    }

    const multiplier = ((this.growthRate + 1) ** (currentDate.getFullYear() - this.
      startingYear));
    return roundMoney(this.startingSalary * multiplier);
  }
}