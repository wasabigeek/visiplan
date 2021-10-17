
import { AccountStore } from "../../../entities/account.js"; // TODO: mock
import Person from "../../../entities/person.js";
import CpfSim, { TITLES } from "../CpfSim.js";

const setUpBaseConfig = () => {
  const accountStore = new AccountStore();
  const person = new Person({ birthDate: new Date(1990, 0, 1) });
  return { accountStore, person };
}

describe('apply_monthly_updates()', () => {
  const addSalaryEntry = (baseConfig) => {
    baseConfig.accountStore.add_entry(
      "cash",
      {
        amount: 5000,
        dateTime: new Date(2022, 7),
        title: "salary"
      }
    );
  }

  test('it generates the correct OA entry', () => {
    const baseConfig = setUpBaseConfig();
    addSalaryEntry(baseConfig);
    const cpfSim = new CpfSim(baseConfig);

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
    const cpfSim = new CpfSim(baseConfig);

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
    const cpfSim = new CpfSim(baseConfig);

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
    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2055, 7, 14) });

    expect(baseConfig.accountStore.get_current_balance("cpf_oa")).toBe(0);
    expect(baseConfig.accountStore.get_current_balance("cpf_sa")).toBe(0);
    expect(baseConfig.accountStore.get_current_balance("cpf_ma")).toBe(0);
  });

  test("it adds CPF LIFE payout entries after a Person's retirement", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.add_entry(
      "cpf_sa",
      {
        amount: 400000, // ~ 367087.09 will be set aside in the RA
        dateTime: new Date(2040, 0)
      }
    )

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2055, 7, 14) });

    const matchingEntry = baseConfig.accountStore.find_entry("cash", (entry) => entry.title == TITLES.cpf_life_payout)
    expect(matchingEntry.amount).toEqual(3907); // 1.03**(2055-2021) * 1430, rounded
    const matchingRetirementEntry = baseConfig.accountStore.find_entry("cpf_ra", (entry) => entry.title == TITLES.cpf_life_payout)
    expect(matchingRetirementEntry.amount).toEqual(-3907);
  });
});

describe("apply_yearly_updates()", () => {
  test("it sets aside the Retirement Sum when a person is 55", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.add_entry(
      "cpf_sa",
      {
        amount: 400000,
        dateTime: new Date(2040, 0)
      }
    )

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_yearly_updates({ yearStart: new Date(2045, 0) });

    expect(baseConfig.accountStore.get_current_balance("cpf_sa")).toBe(32912.91);
    expect(baseConfig.accountStore.get_current_balance("cpf_ra")).toBe(367087.09);
  });
});

describe("apply_monthly_interest()", () => {
  test("it applies a 2.5% p.a. interest on the OA account", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_oa").add_entry({ amount: 100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry.amount).toBe(0.21); // 0.025 / 12 * 100
  });
  test("it applies a 4% p.a. interest on the SA account", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_sa").add_entry({ amount: 100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_sa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry.amount).toBe(0.33); // 0.04 / 12 * 100
  });
  test("it applies a 4% p.a. interest on the MA account", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_ma").add_entry({ amount: 100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_ma").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry.amount).toBe(0.33); // 0.04 / 12 * 100
  });
  test("it does not create an interest entry if the OA account balance is negative", () => {
    const baseConfig = setUpBaseConfig();
    baseConfig.accountStore.get("cpf_oa").add_entry({ amount: -100, dateTime: new Date(2021, 0) });

    const cpfSim = new CpfSim(baseConfig);

    cpfSim.apply_monthly_interest({ monthStart: new Date(2050, 7, 14) });

    const interestEntry = baseConfig.accountStore.get("cpf_oa").entries.find(entry => entry.title == TITLES.cpf_interest);
    expect(interestEntry).toBeUndefined();
  });
});
