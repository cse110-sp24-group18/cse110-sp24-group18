/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom');

const { increment, decrement, updateNumber, adjustFontSize } = require('../../lines-of-code-script');

describe('Lines of Code Widget', () => {

  beforeEach(() => {
    // Read the actual index.html file
    const html = fs.readFileSync(path.resolve(__dirname, '../../../../index.html'), 'utf8');

    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML content into a temporary document
    const tempDocument = parser.parseFromString(html, 'text/html');

    // Safely insert the parsed content into the document
    while (document.documentElement.firstChild) {
      document.documentElement.removeChild(document.documentElement.firstChild);
    }

    Array.from(tempDocument.documentElement.childNodes).forEach((node) => {
      document.documentElement.appendChild(document.adoptNode(node));
    });

    // Ensure the elements are found
    if (!document.getElementById('number') || !document.querySelector('.lines-widget-content')) {
      throw new Error('Elements not found in the DOM');
    }
  });

  test('increments the count', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 5;
    increment(true);
    expect(numberElement.value).toBe('6');
  });

  test('decrements the count', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 5;
    decrement(true);
    expect(numberElement.value).toBe('4');
  });

  test('does not increment past 99999', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 99999;
    increment(true);
    expect(numberElement.value).toBe('99999');
  });

  test('does not decrement below 0', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 0;
    decrement(true);
    expect(numberElement.value).toBe('0');
  });

  test('updates the number and does not allow negative values', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = -5;
    updateNumber(true);
    expect(numberElement.value).toBe('0');
  });

  test('updates the number and does not allow more than 5 digits', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 123456;
    updateNumber(true);
    expect(numberElement.value).toBe('12345');
  });

  test('adjusts font size based on number of digits', () => {
    const numberElement = document.getElementById('number');
    numberElement.value = 5;
    updateNumber(true);
    adjustFontSize();
    expect(numberElement.style.fontSize).toBe('5rem');

    numberElement.value = 50;
    updateNumber(true);
    adjustFontSize();
    expect(numberElement.style.fontSize).toBe('4.5rem');

    numberElement.value = 500;
    updateNumber(true);
    adjustFontSize();
    expect(numberElement.style.fontSize).toBe('4rem');

    numberElement.value = 5000;
    updateNumber(true);
    adjustFontSize();
    expect(numberElement.style.fontSize).toBe('3rem');

    numberElement.value = 50000;
    updateNumber(true);
    adjustFontSize();
    expect(numberElement.style.fontSize).toBe('2.5rem');
  });
});
