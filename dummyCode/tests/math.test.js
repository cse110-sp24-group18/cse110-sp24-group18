const { addtion, subtraction } = require('../math');

test('adds 1 + 2 to equal 3', () => {
  expect(addtion(1, 2)).toBe(3);
});

test('subtracts 5 - 3 to equal 2', () => {
  expect(subtraction(5, 3)).toBe(3);
});
