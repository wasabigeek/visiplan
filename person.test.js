import Person from "./person";

describe('age()', () => {
  test('returns correct age', () => {
    const person = new Person(new Date(2000, 5, 1));
    expect(person.age(new Date(2021, 5, 1))).toBe(21);
  });
})
