
export const roundMoney = (amount, options = {}) => {
  const { toInteger } = options;

  if (toInteger) {
    return Math.round(amount);
  }
  return Math.round(amount * 100) / 100;
};
