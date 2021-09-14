import { calculateTotalCpfContribution } from "../calculateTotalCpfContribution.js";

test('contribution % below 56 years old is correct', () => {
  const amount = calculateTotalCpfContribution({ age: 55, ordinary_wages: 100 });
  expect(amount).toBe(37);
})
