import { calculateCpfOaContribution } from "./cpf.js";

test('calculateCpfOaContribution below 35 years old', () => {
  const { amount } = calculateCpfOaContribution(25, 100);
  expect(amount).toBe(62.17);
})

test('calculateCpfOaContribution at 36-45 years old', () => {
  const { amount } = calculateCpfOaContribution(36, 100);
  expect(amount).toBe(56.77);
})
