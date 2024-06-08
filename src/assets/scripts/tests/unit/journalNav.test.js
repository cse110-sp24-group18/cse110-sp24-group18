import { returnColorForMood, letterMonthToNumber } from '../../journalNav';

test('Checks correct colors are returned from mood: Neutral', () => {
  expect(returnColorForMood('neutral')).toStrictEqual({'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'});
});

test('Checks correct colors are returned from mood: Angry', () => {
  expect(returnColorForMood('angry')).toStrictEqual({'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'});
});

test('Check correct month is returned from string: January', () => {
  expect(letterMonthToNumber('January')).toStrictEqual(1);
});

test('Check correct month is returned from string: October', () => {
  expect(letterMonthToNumber('October')).toStrictEqual(10);
});

test('Check incorrect month is returned from string: sadsadasd', () => {
  expect(letterMonthToNumber('sadsadasd')).toStrictEqual(-1);
});