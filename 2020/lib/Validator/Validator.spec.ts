import { Rule, Validator } from "."

describe('Validator', () => {
  const minLengthTest: Rule<string> = (input) => input.length > 5;
  const MaxLengthTest: Rule<string> = (input) => input.length < 7;
  const stringValidator = new Validator<string>([
    minLengthTest,
    MaxLengthTest,
  ]);

  it('Validates an input based on multiple rules', () => {
    expect(stringValidator.validate('123456')).toBeTruthy();
    expect(stringValidator.validate('1234')).toBeFalsy();
    expect(stringValidator.validate('12345678')).toBeFalsy();
  });

  describe('filtering', () => {
    it('filters invalid entries', () => {
      expect(stringValidator.filterInvalid([
        '123456',
        '1234',
        '12345678',
      ])).toEqual(['123456']);
    })
  })
});