// Prototype

class Entry {
  constructor({ year, amount, category }) {
    this.year = year;
    this.amount = amount;
    this.category = category;
    // actual vs projected
  }
}

// Income, Age => allocations to CPF
const calculateSimpleCpfContribution = (options) => {
  const { monthlyIncome, currentAge, currentYear, retirementAge = 65 } = options;
  if (currentAge >= retirementAge) {
    return [];
  }

  // TODO: change according to age
  // https://www.cpf.gov.sg/Employers/EmployerGuides/employer-guides/paying-cpf-contributions/cpf-contribution-and-allocation-rates
  // const age = currentYear - birthDate.getFullYear();
  const ORDINARY_RATE = 0.23;
  const SPECIAL_RATE = 0.06;
  const MEDISAVE_RATE = 0.08;

  // Ordinary Wage ceiling is 6000
  // https://www.cpf.gov.sg//Employers/EmployerGuides/employer-guides/hiring-employees/cpf-contributions-for-your-employees#Item592
  const baseYearlyIncome = Math.min(monthlyIncome, 6000) * 12;

  let cpfEntries = [];
  cpfEntries.push(new Entry({ year: currentYear, amount: baseYearlyIncome * ORDINARY_RATE, category: 'cpf_oa' }));
  cpfEntries.push(new Entry({ year: currentYear, amount: baseYearlyIncome * SPECIAL_RATE, category: 'cpf_sa' }));
  cpfEntries.push(new Entry({ year: currentYear, amount: baseYearlyIncome * MEDISAVE_RATE, category: 'cpf_ma' }));

  return cpfEntries;
}

// Interest Calculations
// TODO: interest rate varies depending on age
const calculateSimpleCpfInterest = (entries, options) => {
  const { currentYear } = options;
  const cpfOa = new Entry({ year: currentYear, amount: 0, category: 'cpf_oa' });
  const cpfSa = new Entry({ year: currentYear, amount: 0, category: 'cpf_sa' });
  const cpfMa = new Entry({ year: currentYear, amount: 0, category: 'cpf_ma' });

  entries
    .forEach(entry => {
      if (entry.category === 'cpf_oa') {
        cpfOa.amount += entry.amount * 0.025;
      } else if (entry.category === 'cpf_sa') {
        cpfSa.amount += entry.amount * 0.04;
      } else if (entry.category === 'cpf_ma') {
        cpfMa.amount += entry.amount * 0.04;
      }
    });

  return [cpfOa, cpfSa, cpfMa];
}

const calculateSimpleRetirementCpfWithdrawal = (options) => {
  const { currentYear, retirementAge = 65 } = options;

  if (currentYear >= retirementAge) {
    return [
      new Entry({ year: currentYear, amount: -24000, category: 'cpf_sa' })
    ];
  }

  return [];
}

// TODO:
// Additional Topups
// Good-to-have: transfers between accounts
// Withdrawals?

// starting balances
let entries = [
  new Entry({ year: 2021, amount: 100000, category: 'cpf_oa' }),
  new Entry({ year: 2021, amount: 35000, category: 'cpf_sa' }),
  new Entry({ year: 2021, amount: 35000, category: 'cpf_ma' })
]
const CURRENT_INCOME = 10000;
const birthDate = new Date('01/01/1987');
const lifeExpectancy = 95;
let currentYear = (new Date()).getFullYear();
let currentAge = currentYear - birthDate.getFullYear();
let remainingYears = lifeExpectancy - currentAge;
while (remainingYears > 0) {
  // calculate regular transactions
  entries = entries.concat(
    calculateSimpleCpfContribution({ monthlyIncome: CURRENT_INCOME, currentAge, currentYear })
  )
  entries = entries.concat(calculateSimpleRetirementCpfWithdrawal({ currentYear }))
  // calculate interest transactions
  entries = entries.concat(calculateSimpleCpfInterest(entries, { currentYear }));

  currentAge++;
  currentYear++;
  remainingYears--;
}


// aggregate the data
console.log(entries.reduce((acc, entry) => {
  acc[entry.category] += entry.amount;
  return acc;
}, { cpf_oa: 0, cpf_sa: 0, cpf_ma: 0 }));
