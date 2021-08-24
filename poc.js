// Prototype

class Entry {
    constructor({ startDate, endDate = startDate, amount, category }) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.category = category;
        // actual vs projected
    }
}

let data = [new Entry({ startDate: new Date(), amount: 10, category: 'salary' })];

const calculateSimpleCpfContribution = (data, options) => {
    // https://www.cpf.gov.sg/Employers/EmployerGuides/employer-guides/paying-cpf-contributions/cpf-contribution-and-allocation-rates
    // const { birthDate } = options;

    const ORDINARY_RATE = 0.23;
    // const SPECIAL_RATE = 0.06;
    // const MEDISAVE_RATE = 0.08;

    return data
        .filter((entry) => entry.category == 'salary')
        .map((entry) => {
            return new Entry({ startDate: entry.startDate, amount: ORDINARY_RATE * entry.amount })
        })
}

data = data.concat(calculateSimpleCpfContribution(data));

// aggregate the data
// some visualisation
console.log(data);
