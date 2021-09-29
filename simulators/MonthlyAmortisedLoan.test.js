import { MonthlyAmortisedLoan } from "./MonthlyAmortisedLoan";

describe('MonthlyAmortisedLoan monthly_payment', () => {
  test('it calculates the correct amount', () => {
    const loan = new MonthlyAmortisedLoan(100000, 0.03, 10);
    expect(loan.monthly_payment()).toEqual(965.61);
  });
});