import { sleepToValue, computePercentage } from '../../sleep-widget.js';

/**
 * Tests to check if correct sleep returned
 */
test('Checks correct sleep returned', () => {
  expect(sleepToValue('Excellent')).toStrictEqual(5);
});

/**
 * Tests to check if default sleep returned
 */
test('Checks default sleep returned', () => {
  expect(sleepToValue()).toStrictEqual(3);
});

/**
 * Tests to check if defult compute percentage returned
 */
test('Checks defult compute percentage returned', () => {
  expect(computePercentage(1)).toStrictEqual(0);
});

/**
 * Tests to check if 2nd gauge percentage returned
 */
test('Checks 2nd gauge compute percentage returned', () => {
  expect(computePercentage(2)).toStrictEqual(25);
});

/**
 * Tests to check if 3rd gauge percentage returned
 */
test('Checks 3 gauge compute percentage returned', () => {
  expect(computePercentage(3)).toStrictEqual(50);
});

/**
 * Tests to check if Max gauge percentage returned.
 */
test('Checks Max gauge compute percentage returned', () => {
  expect(computePercentage(5)).toStrictEqual(100);
});