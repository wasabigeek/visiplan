import retirementSumTransferBreakdown, { RETIREMENT_SUM_TYPES } from "../retirementSumTransferBreakdown";

test("returns 0 if there is no balance in the Ordinary and Special Account", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 0,
    specialAccountBalance: 0,
    transferYear: 2022
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 0,
    amountFromSpecialAccount: 0
  })
});

test("takes money out of the Special Account first", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 0,
    specialAccountBalance: 200000,
    transferYear: 2022
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 0,
    amountFromSpecialAccount: 186000
  })
});

test("takes money out of the Ordinary Account if there isn't enough in the Special", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 50000,
    specialAccountBalance: 100000,
    transferYear: 2022
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 50000,
    amountFromSpecialAccount: 100000
  })
});

test("estimates the future retirement sum correctly", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 0,
    specialAccountBalance: 1000000,
    transferYear: 2025
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 0,
    amountFromSpecialAccount: 203247.22
  })
});

test("uses the basic sum amount if specified", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 0,
    specialAccountBalance: 1000000,
    transferYear: 2022,
    sumType: RETIREMENT_SUM_TYPES.basic
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 0,
    amountFromSpecialAccount: 93000
  })
});

test("uses the enhanced sum amount if specified", () => {
  const result = retirementSumTransferBreakdown({
    ordinaryAccountBalance: 0,
    specialAccountBalance: 1000000,
    transferYear: 2022,
    sumType: RETIREMENT_SUM_TYPES.enhanced
  });

  expect(result).toEqual({
    amountFromOrdinaryAccount: 0,
    amountFromSpecialAccount: 279000
  })
});
