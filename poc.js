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
  const { monthlyIncome, birthDate, startDate, retirementAge } = options;

  // TODO: change according to age
  // https://www.cpf.gov.sg/Employers/EmployerGuides/employer-guides/paying-cpf-contributions/cpf-contribution-and-allocation-rates
  const ORDINARY_RATE = 0.23;
  const SPECIAL_RATE = 0.06;
  const MEDISAVE_RATE = 0.08;

  const age = startDate.getFullYear() - birthDate.getFullYear();
  const remainingYears = retirementAge - age;

  let cpfEntries = [];
  for (let i = 0; i < remainingYears; i++) {
    cpfEntries.push(new Entry({ year: startDate.getFullYear() + i, amount: monthlyIncome * ORDINARY_RATE, category: 'cpf_oa' }));
    cpfEntries.push(new Entry({ year: startDate.getFullYear() + i, amount: monthlyIncome * SPECIAL_RATE, category: 'cpf_sa' }));
    cpfEntries.push(new Entry({ year: startDate.getFullYear() + i, amount: monthlyIncome * MEDISAVE_RATE, category: 'cpf_ma' }));
  }

  return cpfEntries;
}

// Interest Calculations
const calculateCpfInterest = (entries) => {
  let cpfInterestEntries = [];

  // assumed sorted by year, one entry per year
  entries
    .filter(entry => entry.category === 'cpf_oa')
    .reduce((accCpf, entry) => {
      accCpf += entry.amount;
      const interest = accCpf * 0.025;
      cpfInterestEntries.push(new Entry({ year: entry.year, amount: interest, category: 'cpf_oa' }));

      return accCpf + interest;
    }, 0);

  entries
        .filter(entry => entry.category === 'cpf_sa')
    .reduce((accCpf, entry) => {
      accCpf += entry.amount;
      const interest = accCpf * 0.04;
      cpfInterestEntries.push(new Entry({ year: entry.year, amount: interest, category: 'cpf_sa' }));

      return accCpf + interest;
    }, 0);

  entries
    .filter(entry => entry.category === 'cpf_ma')
    .reduce((accCpf, entry) => {
      accCpf += entry.amount;
      const interest = accCpf * 0.04;
      cpfInterestEntries.push(new Entry({ year: entry.year, amount: interest, category: 'cpf_ma' }));

      return accCpf + interest;
    }, 0);

  return cpfInterestEntries;
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
const CURRENT_INCOME = 4500;
entries = entries.concat(calculateSimpleCpfContribution({ monthlyIncome: CURRENT_INCOME, birthDate: new Date('01/01/1987'), startDate: new Date('01/01/2021'), retirementAge: 65 }));
entries = entries.concat(calculateCpfInterest(entries));

// aggregate the data
console.log(entries.reduce((acc, entry) => {
  acc[entry.category] += entry.amount;
  return acc;
}, { cpf_oa: 0, cpf_sa: 0, cpf_ma: 0 }));
