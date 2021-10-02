import { roundMoney } from "../helpers.js";

export default class SimpleSalary {
  constructor({ startingSalary, startingYear, growthRate = 0.02 }) {
    this.startingSalary = startingSalary;
    this.startingYear = startingYear;
    this.growthRate = growthRate;
  }

  current(currentDate) {
    const multiplier = ((this.growthRate + 1) ** (currentDate.getFullYear() - this.
      startingYear));
    return roundMoney(this.startingSalary * multiplier);
  }
}