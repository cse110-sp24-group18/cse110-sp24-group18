import { sleepToValue } from '../../sleep-widget.js'

test('Checks correct sleep returned', () => {
  expect(sleepToValue('Excellent')).toStrictEqual(5);
});

test('Checks default sleep returned', () => {
  expect(sleepToValue()).toStrictEqual(3);
});