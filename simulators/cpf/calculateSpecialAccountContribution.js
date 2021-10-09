import { roundMoney } from "../../helpers.js";

// https://www.cpf.gov.sg/Assets/employers/Documents/Table%2011_Pte%20and%20Npen_CPF%20Allocation%20Rates%20Jan%202016.pdf

const calculateSpecialAccountContribution = (age, totalCpfContribution) => {
  let contribution = 0;

  if (age > 65) {
    contribution = 0.08 * totalCpfContribution;
  } else if (age > 60) {
    contribution = 0.1515 * totalCpfContribution;
  } else if (age > 55) {
    contribution = 0.1346 * totalCpfContribution;
  } else if (age > 50) {
    contribution = 0.3108 * totalCpfContribution;
  } else if (age > 45) {
    contribution = 0.2162 * totalCpfContribution;
  } else if (age > 35) {
    contribution = 0.1891 * totalCpfContribution;
  } else {
    contribution = 0.1621 * totalCpfContribution;
  }
  return roundMoney(contribution);
};

export default calculateSpecialAccountContribution;
