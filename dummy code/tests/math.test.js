const { add, subtract } = require('../math');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(4);
});

test('subtracts 5 - 3 to equal 2', () => {
  expect(subtract(5, 3)).toBe(2);
});
