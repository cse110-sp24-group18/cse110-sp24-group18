import { sleepToValue, computePercentage, setSleep } from '../../sleep-widget.js'

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

const fs = require('fs');
const path = require('path');
const { getByText, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

describe('Lines of Code Widget', () => {
    let container;
    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../../../../index.html'), 'utf8');
        document.documentElement.innerHTML = html.toString();
        container = document.body;
        if (!document.getElementById('number') || !document.querySelector('.slider-container')) {
            throw new Error('Elements not found in the DOM');
        }
    });

    test('check slider value', () => {
        const slider = document.querySelector('.slider');
        setSleep('Good')
        expect(slider.value).toStrictEqual("4");
    });
});
