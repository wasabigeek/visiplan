import { AccountStore } from "../../../account";
import Person from "../../../person";
import { HdbWithHdbLoanSim, TITLES } from "../HdbWithHdbLoanSim";

describe('HdbWithHdbLoanSim apply_yearly_updates', () => {
  test('it adds the option cost', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const sim = new HdbWithHdbLoanSim({ accountStore, person }, { downpaymentYear: 2022, purchasePrice: 100000 });

    sim.apply_yearly_updates({ yearStart: new Date(2022, 0) });

    const cashEntries = accountStore.get("cash").entries;
    const matchingEntry = cashEntries.find(entry => entry.title == TITLES.option)
    expect(matchingEntry).toBeDefined();
    expect(matchingEntry.amount).toEqual(-2000);
  });
  // TODO: calculate split with CPF
  test('it adds the downpayment cost', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const sim = new HdbWithHdbLoanSim({ accountStore, person }, { downpaymentYear: 2022, purchasePrice: 100000 });

    sim.apply_yearly_updates({ yearStart: new Date(2022, 0) });

    const cashEntries = accountStore.get("cash").entries;
    const matchingEntry = cashEntries.find(entry => entry.title == TITLES.downpayment)
    expect(matchingEntry).toBeDefined();
    expect(matchingEntry.amount).toEqual(-10000);
    expect(matchingEntry.dateTime.getFullYear()).toEqual(2022);
  });
  test('it adds monthly entries for loan repayments', () => {
    const accountStore = new AccountStore();
    const person = new Person(new Date(1987, 0, 1));

    const sim = new HdbWithHdbLoanSim({ accountStore, person }, { downpaymentYear: 2022, purchasePrice: 100000, perAnnumInterestRate: 0.03, loanYears: 10, estimatedTopYear: 2025 });

    sim.apply_yearly_updates({ yearStart: new Date(2025, 0) });

    const cashEntries = accountStore.get("cpf_oa").entries;
    const matchingEntry = cashEntries.find(entry => entry.title == TITLES.monthly_payment)
    expect(matchingEntry).toBeDefined();
    expect(matchingEntry.amount).toEqual(-869.05);
    expect(matchingEntry.dateTime.getFullYear()).toEqual(2025);
  });
});