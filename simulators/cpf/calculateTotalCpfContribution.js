import { roundMoney } from "../helpers.js";

// https://www.cpf.gov.sg/Assets/employers/Documents/Table%201_Pte%20and%20Npen%20CPF%20contribution%20rates%20for%20Singapore%20Citizens%20and%203rd%20year%20SPR%20Jan%202016.pdf
export const calculateTotalCpfContribution = ({ age, ordinary_wages }) => {
  let contribution = 0;

  if (age <= 55) {
    contribution = 0.37 * ordinary_wages;
  }
  // TODO: handle other age bands

  return roundMoney(contribution);
};
