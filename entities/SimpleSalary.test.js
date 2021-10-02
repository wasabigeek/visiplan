import SimpleSalary from "./SimpleSalary.js";

describe("current()", () => {
  test("returns the startingSalary at year 0", () => {
    const salary = new SimpleSalary({
      startingSalary: 5000,
      startingYear: 2021,
      endYear: 2050
    });
    expect(salary.current(new Date(2021, 0))).toEqual(5000);
  });
  test("returns the multiplied salary at year 5", () => {
    const salary = new SimpleSalary({
      startingSalary: 5000,
      startingYear: 2021,
      endYear: 2050
    });
    expect(salary.current(new Date(2026, 0))).toEqual(5520.40);
  });
  test("returns no salary at retirement", () => {
    const salary = new SimpleSalary({
      startingSalary: 5000,
      startingYear: 2021,
      endYear: 2022
    });
    expect(salary.current(new Date(2026, 0))).toEqual(0);
  });
});
