import { updateChecked } from './widgets.js';

/**
 * Adjusts the font size of the number element based on its digit length.
 * Ensures the font size decreases as the number of digits increases to maintain readability.
 */
function adjustFontSize() {
  // Get the number element by its ID
  const numberElement = document.getElementById('number');

  // Determine the number of digits in the current value
  const digits = numberElement.value.toString().length;
  let fontSize;

  // Determine font size based on the number of digits
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
  // Ensure minimum font size of 1.25 rem
  fontSize = fontSize < 1.25 ? 1.25 : fontSize; 

  // Apply the calculated font size to the number element
  numberElement.style.fontSize = `${fontSize  }rem`;
}

/**
 * Increments the value of the number element by 1.
 * @param {boolean} test - Flag indicating if the function is called during a unit test or not.
 */
function increment(test = false) {

  // Get the number element by its ID
  const numberElement = document.getElementById('number');

  // Parse the current value as an integer
  let count = parseInt(numberElement.value, 10);

  // Increment the count if it's less than 6 digits
  if (count < 99999) {
    count++;
  }

  // Update the number element with the new count
  numberElement.value = count;

  // Update the checked status and adjust font size
  updateChecked('linesCoded', count, test);
  adjustFontSize();
}

/**
 * Decrements the value of the number element by 1.
 * @param {boolean} test - Flag indicating if the function is called during a unit test or not.
 */
function decrement(test = false) {
  // Get the number element by its ID
  const numberElement = document.getElementById('number');
  
  // Parse the current value as an integer
  let count = parseInt(numberElement.value, 10);
  
  // Decrement the count ensuring it doesn't go below 0
  count--;
  count = count < 0 ? 0 : count;
  
  // Update the number element with the new count
  numberElement.value = count;

  // Update the checked status and adjust font size
  updateChecked('linesCoded', count, test);
  adjustFontSize();
}

/**
 * Updates the number element based on user input.
 * Ensures the input is a valid number and within the acceptable range.
 * @param {boolean} test - Flag indicating if the function is called during a unit test or not.
 */
function updateNumber(test = false) {

  // Get the number element by its ID
  const numberElement = document.getElementById('number');

  // Parse the input value as a float, round down, and default to 0 if invalid
  let inputValue = Math.floor(parseFloat(numberElement.value)) || 0;

  // Ensure the input value is non-negative and not longer than 5 digits
  inputValue = inputValue < 0 ? 0 : inputValue;
  if (inputValue.toString().length > 5) {
    inputValue = parseInt(inputValue.toString().substring(0, 5), 10);
  }
  // Update the number element with the new input value
  numberElement.value = inputValue;

  // Update the checked status and adjust font size
  updateChecked('linesCoded', inputValue, test);
  adjustFontSize();
}

/**
 * Adds event listeners to the increment, decrement buttons and the number input field.
 * These listeners handle clicks and input changes, calling the appropriate functions.
 */
export function linesOfCodeListeners() {

  // Get the decrement, increment buttons, and number input field by their IDs
  const decButton = document.getElementById('lines-decrement');
  const incButton = document.getElementById('lines-increment');
  const numInput = document.getElementById('number');
  console.log(decButton, incButton, numInput);

  console.log('VALUE', numInput.value);

  // Add click event listener to the decrement button
  decButton.addEventListener('click', () => {
    decrement();
  });

  // Add click event listener to the increment button
  incButton.addEventListener('click', () => {
    increment();
  });

  // Add input event listener to the number input field
  numInput.addEventListener('input', () => {
    updateNumber();
  });

}
/**
 * Sets the value of the number element.
 * @param {number} value - The value to set in the number element.
 */
export function setLinesWidgetNumber(value) {
  
  // Get the number input field by its ID
  const numInput = document.getElementById('number');

  // Set the value of the number input field
  numInput.value = value;
}

// Export functions for unit tests
export { increment, decrement, updateNumber, adjustFontSize }; 
