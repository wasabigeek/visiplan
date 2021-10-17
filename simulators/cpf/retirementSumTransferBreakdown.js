import { roundMoney } from "../../helpers.js";
import { RETIREMENT_SUM_TYPES } from "./constants.js";

const retirementAmountByType2022 = {
  [RETIREMENT_SUM_TYPES.basic]: 93000,
  [RETIREMENT_SUM_TYPES.full]: 186000,
  [RETIREMENT_SUM_TYPES.enhanced]: 279000,
}

const retirementSumTransferBreakdown = ({
  ordinaryAccountBalance,
  specialAccountBalance,
  transferYear,
  sumType = RETIREMENT_SUM_TYPES.full
}) => {
  // TODO: raise if transferYear < 2022
  const retirementSum = roundMoney(1.03 ** (transferYear - 2022) * retirementAmountByType2022[sumType]);

  const amountFromSpecialAccount = Math.min(retirementSum, specialAccountBalance);

  let amountFromOrdinaryAccount = 0;
  if (ordinaryAccountBalance > 0) {
    amountFromOrdinaryAccount = Math.min(retirementSum - amountFromSpecialAccount, ordinaryAccountBalance);
  }

  return {
    amountFromOrdinaryAccount,
    amountFromSpecialAccount
  }
}

export { RETIREMENT_SUM_TYPES };
export default retirementSumTransferBreakdown;
