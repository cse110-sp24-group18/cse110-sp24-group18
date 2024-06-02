import { updateChecked } from "./widgets.js";

function adjustFontSize() {
  const numberElement = document.getElementById('number');
  let digits = numberElement.value.toString().length;
  let fontSize;

  switch (digits) {
      case 1:
          fontSize = 80;
          break;
      case 2:
          fontSize = 70;
          break;
      case 3:
          fontSize = 60;
          break;
      case 4:
          fontSize = 50;
          break;
      default:
          fontSize = 40;
          break;
  }

  fontSize = fontSize < 20 ? 20 : fontSize;
  numberElement.style.fontSize = fontSize + 'px';
}

function increment() {
  const numberElement = document.getElementById('number');
  let count = parseInt(numberElement.value, 10);
  if (count < 99999) {
      count++;
  }
  numberElement.value = count;

  updateChecked('linesCoded', count);
  adjustFontSize();
}

function decrement() {
  const numberElement = document.getElementById('number');
  let count = parseInt(numberElement.value, 10);
  count--;
  count = count < 0 ? 0 : count;
  numberElement.value = count;

  updateChecked('linesCoded', count);
  adjustFontSize();
}

function updateNumber() {
  const numberElement = document.getElementById('number');
  let inputValue = Math.floor(parseFloat(numberElement.value)) || 0;
  inputValue = inputValue < 0 ? 0 : inputValue;
  if (inputValue.toString().length > 5) {
      inputValue = parseInt(inputValue.toString().substring(0, 5), 10);
  }
  numberElement.value = inputValue;

  updateChecked('linesCoded', inputValue);
  adjustFontSize();
}

export function linesOfCodeListeners() {
    const decButton = document.getElementById('lines-decrement');
    const incButton = document.getElementById('lines-increment');
    const numInput = document.getElementById('number');
    console.log(decButton, incButton, numInput);

    console.log('VALUE', numInput.value);

    decButton.addEventListener('click', () => {
        decrement();
    })

    incButton.addEventListener('click', () => {
        increment();
    })

    numInput.addEventListener('input', () => {
        updateNumber();
    })
}

export function setLinesWidgetNumber(value) {
    const numInput = document.getElementById('number');
    numInput.value = value;
}