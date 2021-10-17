export default class Person {
  constructor({ birthDate, retirementAge = 65, salarySchedule }) {
    this.birthDate = birthDate;
    // TODO: There's a distinction between target retirement age and statutory retirement age.
    // This is more the latter at the moment, should it be the former?
    this.retirementAge = retirementAge;
    this.salarySchedule = salarySchedule;
  }

  age(currentDate) {
    // this is a bit naive, but it will do for now
    return currentDate.getFullYear() - this.birthDate.getFullYear();
  }

  is_retired(currentDate) {
    return this.age(currentDate) >= this.retirementAge;
  }

  get retirement_year() {
    return this.birthDate.getFullYear() + this.retirementAge;
  }

  salary(currentDate) {
    return this.salarySchedule.current(currentDate);
  }
}