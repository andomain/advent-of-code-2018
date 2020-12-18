import { evaluateExpression, evaluateParenthesis, getParts, prioritizeAddition } from '.';

describe('getParts', () => {
  it('gets the operands and operation from a string', () => {
    expect(getParts('1 + 2')).toEqual({ a: 1, b: 2, op: '+' });
  });

  it('handles brackets', () => {
    expect(getParts('(2 * 3)')).toEqual({ a: 2, b: 3, op: '*' });
  });
});

describe('evaluateExpression', () => {
  it('evaluates addition', () => {
    expect(evaluateExpression('1+2')).toBe(3);
  });

  it('evaluates multiplication', () => {
    expect(evaluateExpression('(3 * 2)')).toBe(6);
  });
});

describe('prioritizeAddition', () => {
  it('evaluates addition first', () => {
    expect(prioritizeAddition('2 * 3 + 1')).toBe(8);
  })
})

describe('evaluateParenthesis', () => {
  it('evaluates expressions in parenthesis', () => {
    expect(evaluateParenthesis('1 + (2 * 3)', evaluateExpression)).toBe('1 + 6');
  });

  it('evaluates multiple expressions in parenthesis', () => {
    expect(evaluateParenthesis('(1 + 3) + (2 * 3)', evaluateExpression)).toBe('4 + 6');
  });

  it('evaluates nested parenthesis', () => {
    expect(evaluateParenthesis('1 + (2 * (3 + 4))', evaluateExpression)).toBe('1 + 14');
  });

  it('does not modify the input string', () => {
    const input = '1 + (2 + 3)';
    const output = evaluateParenthesis(input, evaluateExpression);

    expect(input).toBe('1 + (2 + 3)');
    expect(output).toBe('1 + 5');
  });

  it('handles multiple operands in a bracket', () => {
    expect(evaluateParenthesis('1 + (2 + 3 + 4)', evaluateExpression)).toBe('1 + 9')
  })
});