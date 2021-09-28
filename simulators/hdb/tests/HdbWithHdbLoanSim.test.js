import { AccountStore } from "../../../account";
import Person from "../../../person";
import { HdbWithHdbLoanSim } from "../HdbWithHdbLoanSim";

describe('HdbWithHdbLoanSim apply_yearly_updates', () => {
  test('it adds the option cost', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const sim = new HdbWithHdbLoanSim({ accountStore, person }, { downpaymentYear: 2022, purchasePrice: 100000 });

    sim.apply_yearly_updates({ yearStart: new Date(2022, 0) });

    const cashEntries = accountStore.get("cash").entries;
    expect(cashEntries.find(entry => entry.amount == -2000)).toBeDefined();
  });
  test('it adds the downpayment cost', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const sim = new HdbWithHdbLoanSim({ accountStore, person }, { downpaymentYear: 2022, purchasePrice: 100000 });

    sim.apply_yearly_updates({ yearStart: new Date(2022, 0) });

    const cashEntries = accountStore.get("cash").entries;
    const matchingEntry = cashEntries.find(entry => entry.amount == -10000 && entry.dateTime.getFullYear() == 2022);
    expect(matchingEntry).toBeDefined();
  });
});