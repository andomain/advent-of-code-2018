interface IVal<T> {
  validate(candidate: T): boolean;
}

export abstract class Validator<T> implements IVal<T> {
  constructor() { };

  abstract validate(candidate: T): boolean;
}
