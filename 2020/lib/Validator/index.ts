export type Rule<T> = (candidate: T) => boolean;

export class Validator<T> {
  private rules: Rule<T>[];
  constructor (rules: Rule<T>[]) {
    this.rules = rules;
  }

  validate(input: T): boolean {
    return this.rules.every((rule => rule(input)));
  }

  filterInvalid(input: T[]): T[] {
    return input.filter(el => this.validate(el));
  }
}