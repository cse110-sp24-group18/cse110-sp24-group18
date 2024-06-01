/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { getByText, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

const { increment, decrement, updateNumber, adjustFontSize } = require('../../../lines-of-code-widget/lines-of-code-script');

describe('Lines of Code Widget', () => {
    let container;

    beforeEach(() => {
        // Read the actual index.html file
        const html = fs.readFileSync(path.resolve(__dirname, '../../../../index.html'), 'utf8');
        document.documentElement.innerHTML = html.toString();
        container = document.body;

        // Ensure the elements are found
        if (!document.getElementById('number') || !document.querySelector('.lines-widget-content')) {
            throw new Error('Elements not found in the DOM');
        }
    });

    test('increments the count', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 5;
        increment();
        expect(numberElement.value).toBe("6");
    });

    test('decrements the count', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 5;
        decrement();
        expect(numberElement.value).toBe("4");
    });

    test('does not increment past 99999', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 99999;
        increment();
        expect(numberElement.value).toBe("99999");
    });

    test('does not decrement below 0', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 0;
        decrement();
        expect(numberElement.value).toBe("0");
    });

    test('updates the number and does not allow negative values', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = -5;
        updateNumber();
        expect(numberElement.value).toBe("0");
    });

    test('updates the number and does not allow more than 5 digits', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 123456;
        updateNumber();
        expect(numberElement.value).toBe("12345");
    });

    test('adjusts font size based on number of digits', () => {
        const numberElement = document.getElementById('number');
        numberElement.value = 5;
        updateNumber();
        adjustFontSize();
        expect(numberElement.style.fontSize).toBe('80px');

        numberElement.value = 50;
        updateNumber();
        adjustFontSize();
        expect(numberElement.style.fontSize).toBe('70px');

        numberElement.value = 500;
        updateNumber();
        adjustFontSize();
        expect(numberElement.style.fontSize).toBe('60px');

        numberElement.value = 5000;
        updateNumber();
        adjustFontSize();
        expect(numberElement.style.fontSize).toBe('50px');

        numberElement.value = 50000;
        updateNumber();
        adjustFontSize();
        expect(numberElement.style.fontSize).toBe('40px');
    });
});
