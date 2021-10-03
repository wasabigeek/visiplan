
import { AccountStore } from "../../../entities/account.js"; // TODO: mock
import Person from "../../../entities/person.js";
import SimpleSalary from "../../../entities/SimpleSalary.js";
import { CpfSalaryContributionSim, TITLES } from "../CpfSalaryContributionSim.js";

const setUpBaseConfig = () => {
  const accountStore = new AccountStore();
  const person = new Person({ birthDate: new Date(1990, 0, 1), salarySchedule: new SimpleSalary({ startingSalary: 5000, startingYear: 2022 }) });
  return { accountStore, person };
}

describe('apply_monthly_updates()', () => {
  const addSalaryEntry = (baseConfig) => {
    baseConfig.accountStore.get('cash').add_entry({
      amount: 1000,
      dateTime: new Date(2022, 7),
      title: "salary"
    });
  }

  test('it calculates CPF OA correctly', () => {
    const baseConfig = setUpBaseConfig();

    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const oaBalance = baseConfig.accountStore.get("cpf_oa").current_balance();
    expect(oaBalance).toBe(1150.15);
  });
  test('it generates OA entries with the correct date', () => {
    const baseConfig = setUpBaseConfig();

    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const dateTime = baseConfig.accountStore
      .get("cpf_oa")
      .entries[0]
      .dateTime;
    expect(dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });
  test("it stops increasing after a Person's retirement", () => {
    const baseConfig = setUpBaseConfig();

    const cpfSim = new CpfSalaryContributionSim(baseConfig);

    cpfSim.apply_monthly_updates({ monthStart: new Date(2050, 7, 14) });

    const oaBalance = baseConfig.accountStore.get("cpf_oa").current_balance();
    expect(oaBalance).toBe(0);
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
