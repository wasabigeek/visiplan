
import { AccountStore } from "../../../account.js"; // TODO: mock
import Person from "../../../person.js";
import { CpfSalaryContributionSim, TITLES } from "../CpfSalaryContributionSim.js";

describe('apply_monthly_updates()', () => {
  test('it calculates CPF OA correctly', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const cpfSim = new CpfSalaryContributionSim({ accountStore, person }, { income: 5000 });

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const oaBalance = accountStore.get("cpf_oa").current_balance();
    expect(oaBalance).toBe(1150.15);
  });
  test('it generates OA entries with the correct date', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const cpfSim = new CpfSalaryContributionSim({ accountStore, person }, { income: 5000 });

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const dateTime = accountStore
      .get("cpf_oa")
      .entries[0]
      .dateTime;
    expect(dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });
  test("it stops increasing after a Person's retirement", () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(2000, 0, 1));

    const cpfSim = new CpfSalaryContributionSim({ accountStore, person }, { income: 5000, retirementAge: 50 });

    cpfSim.apply_monthly_updates({ monthStart: new Date(2050, 7, 14) });

    const oaBalance = accountStore.get("cpf_oa").current_balance();
    expect(oaBalance).toBe(0);
  });
});

describe("apply_monthly_interest()", () => {
  test("it applies a 2.5% p.a. interest on the OA account", () => {
    const accountStore = new AccountStore();
    accountStore.get("cpf_oa").add_entry({ amount: 100, dateTime: new Date(2021, 0) });
    const person = new Person(new Date(2000, 0, 1));

    const cpfSim = new CpfSalaryContributionSim({ accountStore, person }, { income: 5000, retirementAge: 50 });

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry.amount).toBe(0.21); // 0.025 / 12 * 100
  });
  test("it does not create an interest entry if the OA account balance is negative", () => {
    const accountStore = new AccountStore();
    accountStore.get("cpf_oa").add_entry({ amount: -100, dateTime: new Date(2021, 0) });
    const person = new Person(new Date(2000, 0, 1));

    const cpfSim = new CpfSalaryContributionSim({ accountStore, person }, { income: 5000, retirementAge: 50 });

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry).toBeUndefined();
  });
});
