import calculateMedisaveAccountContribution from "../calculateMedisaveAccountContribution.js";

test('returns correct amount below 35 years old', () => {
  const amount = calculateMedisaveAccountContribution(25, 100);
  expect(amount).toBe(21.62);
})

test('returns correct amount at 36-45 years old', () => {
  const amount = calculateMedisaveAccountContribution(36, 100);
  expect(amount).toBe(24.32);
})

test('returns correct amount at 46-50 years old', () => {
  const amount = calculateMedisaveAccountContribution(46, 100);
  expect(amount).toBe(27.02);
})

test('returns correct amount at 51-55 years old', () => {
  const amount = calculateMedisaveAccountContribution(51, 100);
  expect(amount).toBe(28.37);
})

test('returns correct amount at 56-60 years old', () => {
  const amount = calculateMedisaveAccountContribution(56, 100);
  expect(amount).toBe(40.38);
})

test('returns correct amount at 61-65 years old', () => {
  const amount = calculateMedisaveAccountContribution(61, 100);
  expect(amount).toBe(63.63);
})

test('returns correct amount at >65 years old', () => {
  const amount = calculateMedisaveAccountContribution(66, 100);
  expect(amount).toBe(84);
})
