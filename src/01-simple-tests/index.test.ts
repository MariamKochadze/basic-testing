// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from "01-simple-tests";

describe('simpleCalculator tests', () => {
  test('should add two numbers correctly', () => {
    const result = simpleCalculator({ a: 5, b: 10, action: Action.Add });
    expect(result).toBe(15);
  });


  test('subtract two numbers', () => {
    const result = simpleCalculator({a: 10, b: 5, action: Action.Subtract});
    expect(result).toBe(5);
  });

  test(' multiply two numbers', () => {
    const result =simpleCalculator({a: 5, b: 10, action: Action.Multiply});
    expect(result).toBe(50);
  });

  test('divide two numbers', () => {
    const result = simpleCalculator({a: 10, b:5, action: Action.Divide});
    expect(result).toBe(2)
  });

  test('exponentiate two numbers', () => {
    const result = simpleCalculator({a: 2, b: 2, action:Action.Exponentiate});
    expect(result).toBe(4);
  });

  test('return null for invalid action', () => {
    const result = simpleCalculator({a:2, b: '2', action: Action.Add});
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({a:'1', b: '2', action: Action.Multiply});
    expect(result).toBe(null);
  });
});
