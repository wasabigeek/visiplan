import { roundMoney } from "../../helpers.js";

// https://www.cpf.gov.sg/Assets/employers/Documents/Table%2011_Pte%20and%20Npen_CPF%20Allocation%20Rates%20Jan%202016.pdf

const calculateMedisaveAccountContribution = (age, totalCpfContribution) => {
  let contribution = 0;

  if (age > 65) {
    contribution = 0.84 * totalCpfContribution;
  } else if (age > 60) {
    contribution = 0.6363 * totalCpfContribution;
  } else if (age > 55) {
    contribution = 0.4038 * totalCpfContribution;
  } else if (age > 50) {
    contribution = 0.2837 * totalCpfContribution;
  } else if (age > 45) {
    contribution = 0.2702 * totalCpfContribution;
  } else if (age > 35) {
    contribution = 0.2432 * totalCpfContribution;
  } else {
    contribution = 0.2162 * totalCpfContribution;
  }
  return roundMoney(contribution);
};

export default calculateMedisaveAccountContribution;
