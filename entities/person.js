export default class Person {
  constructor({ birthDate, retirementAge = 65 }) {
    this.birthDate = birthDate;
    // TODO: There's a distinction between target retirement age and statutory retirement age.
    // This is more the latter at the moment, should it be the former?
    this.retirementAge = retirementAge;
  }

  age(currentDate) {
    // this is a bit naive, but it will do for now
    return currentDate.getFullYear() - this.birthDate.getFullYear();
  }

  is_retired(currentDate) {
    return this.age(currentDate) >= this.retirementAge;
  }
}