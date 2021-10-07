import { AccountStore } from "../entities/account.js";
import Person from "../entities/person.js";
import SimpleInvestmentSim, { TITLES } from "./SimpleInvestmentSim.js"

describe("apply_monthly_updates()", () => {
  test("creates entries in the simple_investments account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.add_entry("cash", { amount: 1000, dateTime: new Date() })

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { monthlyDeposit: 1000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 0) });

    const investmentEntries = accountStore
      .get("simple_investments")
      .entries;
    expect(investmentEntries.length).toEqual(1);
    expect(investmentEntries[0].amount).toEqual(1000);
  });
  test("creates withdrawal entries in the cash account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.add_entry("cash", { amount: 1000, dateTime: new Date() })

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { monthlyDeposit: 1000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 0) });

    const withdrawalEntry = accountStore
      .get("cash")
      .entries
      .find(entry => entry.amount == -1000);
    expect(withdrawalEntry).toBeDefined();
  });
  test("withdraws simple_investments after retirement", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.add_entry("simple_investments", { amount: 1000, dateTime: new Date() })

    const sim = new SimpleInvestmentSim({ accountStore, person }, { drawdownRate: 0.03 });

    sim.apply_monthly_updates({ monthStart: new Date(2060, 0) });

    const withdrawalEntry = accountStore
      .get("simple_investments")
      .entries
      .find(entry => entry.amount == -30);
    expect(withdrawalEntry).toBeDefined();

    const cashEntry = accountStore
      .get("cash")
      .entries
      .find(entry => entry.amount == 30);
    expect(cashEntry).toBeDefined();
  });
  test("does not withdraw more than what is in the cash account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.add_entry("cash", { amount: 500, dateTime: new Date() })

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { monthlyDeposit: 1000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 0) });

    const investmentEntries = accountStore
      .get("simple_investments")
      .entries;
    expect(investmentEntries[0].amount).toEqual(500);
  });
  test("does nothing if there is no money in the cash account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.get('cash').add_entries([
      { amount: 1000, dateTime: new Date() },
      { amount: -1000, dateTime: new Date() }
    ])

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { monthlyDeposit: 1000 });

    sim.apply_monthly_updates({ monthStart: new Date(2022, 0) });

    const cashEntries = accountStore
      .get("cash")
      .entries;
    expect(cashEntries.length).toEqual(2);

    const investmentEntries = accountStore
      .get("simple_investments")
      .entries;
    expect(investmentEntries.length).toEqual(0);
  });
});

describe("apply_yearly_interest()", () => {
  test("does nothing if there is no balance in the simple_investments account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.get('simple_investments').add_entries([
      { amount: 100, dateTime: new Date() },
      { amount: -100, dateTime: new Date() }
    ])

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { perAnnumInterestRate: 0.05 });

    sim.apply_yearly_interest({ yearStart: new Date(2022, 0) });

    const investmentBalance = accountStore
      .get("simple_investments")
      .current_balance();
    expect(investmentBalance).toEqual(0);
  });
  test("creates interest entries in the simple_investments account", () => {
    const accountStore = new AccountStore();
    const person = new Person({ birthDate: new Date(1995, 0, 1) });
    accountStore.add_entry("simple_investments", { amount: 1000, dateTime: new Date() })

    const startDate = new Date(2022, 0);
    const sim = new SimpleInvestmentSim({ accountStore, person, startDate }, { perAnnumInterestRate: 0.05 });

    sim.apply_yearly_interest({ monthStart: new Date(2022, 0) });

    const interestEntry = accountStore
      .get("simple_investments")
      .entries
      .find(entry => entry.title == TITLES.interest);
    expect(interestEntry.amount).toEqual(50);
  });
});