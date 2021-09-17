import { CpfSim } from "../index.js";
import { AccountStore } from "../../../account.js"; // TODO: mock
import Person from "../../../person.js";

describe('apply_monthly_updates()', () => {
  test('it calculates CPF OA correctly', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const cpfSim = new CpfSim({ accountStore, person }, { income: 5000 });

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const oaBalance = accountStore.get("cpf_oa").current_balance();
    expect(oaBalance).toBe(1150.15);
  });
  test('it generates OA entries with the correct date', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const cpfSim = new CpfSim({ accountStore, person }, { income: 5000 });

    cpfSim.apply_monthly_updates({ monthStart: new Date(2022, 7, 14) });

    const dateTime = accountStore
      .get("cpf_oa")
      .entries[0]
      .dateTime;
    expect(dateTime.toISOString()).toBe(new Date(2022, 7, 14).toISOString());
  });
});
