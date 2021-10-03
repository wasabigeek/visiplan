import { AccountStore } from "../entities/account.js";
import Person from "../entities/person.js";
import SimpleSalarySim, { TITLES } from "./SimpleSalarySim.js"

describe("apply_monthly_updates()", () => {
  test("sets salary at the base value for the first year", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1987, 0, 1) });

    const startDate = new Date(2022, 0);
    const sim = new SimpleSalarySim({ accountStore, person, startDate }, { baseSalary: 5000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const cashAccount = accountStore.get("cash").entries;
    const salaryEntry = cashAccount.find(entry => entry.title == TITLES.salary);
    expect(salaryEntry.amount).toEqual(5000);
  });

  test("accounts for salary growth rate", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1987, 0, 1) });

    const startDate = new Date(2022, 0);
    const sim = new SimpleSalarySim({ accountStore, person, startDate }, { baseSalary: 5000, growthRate: 0.03 });

    sim.apply_monthly_updates({ monthStart: new Date(2024, 7, 14) });

    const cashAccount = accountStore.get("cash").entries;
    const salaryEntry = cashAccount.find(entry => entry.title == TITLES.salary);
    expect(salaryEntry.amount).toEqual(5304.5);
  });

  test("stops adding salary after retirement", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(2000, 0, 1) });

    const startDate = new Date();
    const sim = new SimpleSalarySim({ accountStore, person, startDate }, { baseSalary: 5000 });

    sim.apply_monthly_updates({ monthStart: new Date(2065, 7, 14) });

    const cashAccount = accountStore.get("cash").entries;
    const salaryEntry = cashAccount.find(entry => entry.title == TITLES.salary);
    expect(salaryEntry).toBeUndefined();
  });
});