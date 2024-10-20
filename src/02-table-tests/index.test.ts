// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 20, b: 4, action: Action.Divide, expected: 5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );

  test('should return null for invalid inputs', () => {
    const invalidInputs = [
      { a: 'not a number', b: 10, action: Action.Add },
      { a: null, b: 10, action: Action.Multiply },
      { a: 10, b: 'not a number', action: Action.Divide },
    ];

    invalidInputs.forEach(input => {
      const result = simpleCalculator(input);
      expect(result).toBeNull();
    });
  });
});
