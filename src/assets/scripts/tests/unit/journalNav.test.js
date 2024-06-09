/**
 * @jest-environment jsdom
 */

import { letterMonthToNumber } from '../../journalNav';

test('Check correct month is returned from string: January', () => {
  expect(letterMonthToNumber('January')).toStrictEqual(1);
});

test('Check correct month is returned from string: October', () => {
  expect(letterMonthToNumber('October')).toStrictEqual(10);
});

test('Check incorrect month is returned from string: sadsadasd', () => {
  expect(letterMonthToNumber('sadsadasd')).toStrictEqual(-1);
});