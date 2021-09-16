export default class Person {
  constructor(birthDate) {
    this.birthDate = birthDate;
  }

  age(currentDate) {
    // this is a bit naive, but it will do for now
    return currentDate.getFullYear() - this.birthDate.getFullYear();
  }
}