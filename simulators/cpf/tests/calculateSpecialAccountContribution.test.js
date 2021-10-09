import calculateSpecialAccountContribution from "../calculateSpecialAccountContribution.js";

test('returns correct amount below 35 years old', () => {
  const amount = calculateSpecialAccountContribution(25, 100);
  expect(amount).toBe(16.21);
})

test('returns correct amount at 36-45 years old', () => {
  const amount = calculateSpecialAccountContribution(36, 100);
  expect(amount).toBe(18.91);
})

test('returns correct amount at 46-50 years old', () => {
  const amount = calculateSpecialAccountContribution(46, 100);
  expect(amount).toBe(21.62);
})

test('returns correct amount at 51-55 years old', () => {
  const amount = calculateSpecialAccountContribution(51, 100);
  expect(amount).toBe(31.08);
})

test('returns correct amount at 56-60 years old', () => {
  const amount = calculateSpecialAccountContribution(56, 100);
  expect(amount).toBe(13.46);
})

test('returns correct amount at 61-65 years old', () => {
  const amount = calculateSpecialAccountContribution(61, 100);
  expect(amount).toBe(15.15);
})

test('returns correct amount at >65 years old', () => {
  const amount = calculateSpecialAccountContribution(66, 100);
  expect(amount).toBe(8);
})
