
import { AccountStore } from "../../../entities/account.js"; // TODO: mock
import Person from "../../../entities/person.js";
import { CpfSalaryContributionSim, TITLES } from "../CpfSalaryContributionSim.js";

const setUpBaseConfig = () => {
  const accountStore = new AccountStore();
  const person = new Person({ birthDate: new Date(1990, 0, 1) });
  return { accountStore, person };
}

describe('apply_monthly_updates()', () => {
  const addSalaryEntry = (baseConfig) => {
    baseConfig.accountStore.get('cash').add_entry({
      amount: 5000,
      dateTime: new Date(2022, 7),
      title: "salary"
    });
  }

  test('it generates the correct OA entry', () => {
    const baseConfig = setUpBaseConfig();
    addSalaryEntry(baseConfig);
    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const entry = baseConfig.accountStore
      .get("cpf_oa")
      .entries[0];
    expect(entry.amount).toEqual(1150.15);
    expect(entry.dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });

  test('it generates SA entries', () => {
    const baseConfig = setUpBaseConfig();
    addSalaryEntry(baseConfig);
    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const entry = baseConfig.accountStore
      .get("cpf_sa")
      .entries[0];
    expect(entry.amount).toEqual(299.89);
    expect(entry.dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });

  test('it generates MA entries', () => {
    const baseConfig = setUpBaseConfig();
    addSalaryEntry(baseConfig);
    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const entry = baseConfig.accountStore
      .get("cpf_ma")
      .entries[0];
    expect(entry.amount).toEqual(399.97);
    expect(entry.dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });

  test("it stops contributions after a Person's retirement", () => {
    const baseConfig = setUpBaseConfig();
    addSalaryEntry(baseConfig);
    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2055, 7, 14) });

    expect(baseConfig.accountStore.get_current_balance("cpf_oa")).toBe(0);
    expect(baseConfig.accountStore.get_current_balance("cpf_sa")).toBe(0);
    expect(baseConfig.accountStore.get_current_balance("cpf_ma")).toBe(0);
  });
});

describe("apply_monthly_interest()", () => {
  test("it applies a 2.5% p.a. interest on the OA account", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_oa").add_entry({ amount: 100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry.amount).toBe(0.21); // 0.025 / 12 * 100
  });
  test("it does not create an interest entry if the OA account balance is negative", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_oa").add_entry({ amount: -100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry).toBeUndefined();
  });
});
