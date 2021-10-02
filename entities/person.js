export default class Person {
  constructor({ birthDate, retirementAge = 65 }) {
    this.birthDate = birthDate;
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