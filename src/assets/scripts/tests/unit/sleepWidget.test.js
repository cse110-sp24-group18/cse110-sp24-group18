import { sleepToValue, computePercentage } from '../../sleep-widget.js';

test('Checks correct sleep returned', () => {
  expect(sleepToValue('Excellent')).toStrictEqual(5);
});

test('Checks default sleep returned', () => {
  expect(sleepToValue()).toStrictEqual(3);
});

test('Checks defult compute percentage returned', () => {
  expect(computePercentage(1)).toStrictEqual(0);
});

test('Checks 2　gauge compute percentage returned', () => {
  expect(computePercentage(2)).toStrictEqual(25);
});

test('Checks 3　gauge compute percentage returned', () => {
  expect(computePercentage(3)).toStrictEqual(50);
});

test('Checks Max　gauge compute percentage returned', () => {
  expect(computePercentage(5)).toStrictEqual(100);
});