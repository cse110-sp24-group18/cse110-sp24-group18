import { updateChecked } from "./widgets.js";

function adjustFontSize() {
  const numberElement = document.getElementById('number');
  let digits = numberElement.value.toString().length;
  let fontSize;

  switch (digits) {
    case 1:
        fontSize = 5; // 5 rem
        break;
    case 2:
        fontSize = 4.5; // 4.5 rem
        break;
    case 3:
        fontSize = 4; // 4 rem
        break;
    case 4:
        fontSize = 3; // 3 rem
        break;
    default:
        fontSize = 2.5; // 2.5 rem
        break;
}

fontSize = fontSize < 1.25 ? 1.25 : fontSize; // Minimum font size of 1.25 rem
numberElement.style.fontSize = fontSize + 'rem';
}

function increment(test = false) {
  const numberElement = document.getElementById('number');
  let count = parseInt(numberElement.value, 10);
  if (count < 99999) {
      count++;
  }
  numberElement.value = count;

  updateChecked('linesCoded', count, test);
  adjustFontSize();
}

function decrement(test = false) {
  const numberElement = document.getElementById('number');
  let count = parseInt(numberElement.value, 10);
  count--;
  count = count < 0 ? 0 : count;
  numberElement.value = count;

  updateChecked('linesCoded', count, test);
  adjustFontSize();
}

function updateNumber(test = false) {
  const numberElement = document.getElementById('number');
  let inputValue = Math.floor(parseFloat(numberElement.value)) || 0;
  inputValue = inputValue < 0 ? 0 : inputValue;
  if (inputValue.toString().length > 5) {
      inputValue = parseInt(inputValue.toString().substring(0, 5), 10);
  }
  numberElement.value = inputValue;

  updateChecked('linesCoded', inputValue, test);
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

export { increment, decrement, updateNumber, adjustFontSize };// exporting to tests file
