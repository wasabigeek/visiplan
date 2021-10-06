import { AccountStore } from "../entities/account.js";
import Person from "../entities/person.js";
import SimpleInvestmentSim from "./SimpleInvestmentSim.js"

describe("apply_monthly_updates()", () => {
  test("creates entries in the simple_investments account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { monthlyDeposit: 1000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 0) });

    const investmentEntries = accountStore
      .get("simple_investments")
      .entries;
    expect(investmentEntries.length).toEqual(1);
    expect(investmentEntries[0].amount).toEqual(1000);
  });
});