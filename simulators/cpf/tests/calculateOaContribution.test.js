import { calculateOaContribution } from "../calculateOaContribution.js";

test('calculateMonthlyCpfOaContribution below 35 years old', () => {
  const amount = calculateOaContribution(25, 100);
  expect(amount).toBe(62.17);
})

test('calculateMonthlyCpfOaContribution at 36-45 years old', () => {
  const amount = calculateOaContribution(36, 100);
  expect(amount).toBe(56.77);
})

test('calculateMonthlyCpfOaContribution at 46-50 years old', () => {
  const amount = calculateOaContribution(46, 100);
  expect(amount).toBe(51.36);
})

test('calculateMonthlyCpfOaContribution at 51-55 years old', () => {
  const amount = calculateOaContribution(51, 100);
  expect(amount).toBe(40.55);
})

test('calculateMonthlyCpfOaContribution at 56-60 years old', () => {
  const amount = calculateOaContribution(56, 100);
  expect(amount).toBe(46.16);
})

test('calculateMonthlyCpfOaContribution at 61-65 years old', () => {
  const amount = calculateOaContribution(61, 100);
  expect(amount).toBe(21.22);
})

test('calculateMonthlyCpfOaContribution at >65 years old', () => {
  const amount = calculateOaContribution(66, 100);
  expect(amount).toBe(8);
})
