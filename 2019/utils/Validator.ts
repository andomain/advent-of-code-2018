interface IVal<T> {
  validators: { (candidate: T): boolean }[];
  validate(candidate: T): boolean;
}

type valFn<T> = (candidate: T) => boolean;

export class Validator<T> implements IVal<T> {
  constructor(public validators: { (candidate: T): boolean }[]) { };

  private makeValidator(val: T) {
    return (valid: boolean, fn: valFn<T>): boolean => (valid && fn(val));
  }

  validate(candidate: T): boolean {
    return this.validators.reduce(this.makeValidator(candidate), true);
  }
}
