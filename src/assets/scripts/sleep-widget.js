/**
 * @jest-environment jsdom
 */

import { updateChecked } from './widgets.js';

/**
 * This initializes and manages the sleep-widget.
 */
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');

  // Updates the slider background color,
  slider.oninput = function() {
    const percentage = computePercentage(this.value);
    this.style.background = `linear-gradient(to right, #FF5C35 0%, #FF5C35 ${percentage}%, #e5dedb ${percentage}%, #e5dedb 100%)`;
  };

  //set default slider position
  slider.value = 3;  
  slider.dispatchEvent(new Event('input')); 
  
  
  //chanage a label color
  const condition_labels = document.querySelectorAll('.label p');
  const time_labels = document.querySelectorAll('.label span');

  //remove heighlight from all labels, and apply the style to
  //only selected label.
  function updateLabelColor() {
    condition_labels.forEach(label => {
      label.classList.remove('highlight-color');
    });
    time_labels.forEach(label => {
      label.classList.remove('highlight-color');
    });
    condition_labels[5 - (slider.value)].classList.add('highlight-color');
    time_labels[5 - (slider.value)].classList.add('highlight-color');
    updateChecked('sleep', condition_labels[5 - (slider.value)].textContent);
  }
  updateLabelColor();
  slider.addEventListener('input', updateLabelColor);
});

/**
 * Updates label color, slider position, and slider background color,
 * corresponding to the currentSleep state.
 * @param {int} currentSleep 
 */
export function setSleep(currentSleep) {
  
  //set slider position
  const slider = document.querySelector('.slider');
  const sliderValue = sleepToValue(currentSleep);
  slider.value = sliderValue;  

  //change background color of the slider.
  const percentage = computePercentage(sliderValue);
  slider.style.background = `linear-gradient(to right, #FF5C35 0%, #FF5C35 ${percentage}%, #e5dedb ${percentage}%, #e5dedb 100%)`;

  //change the selected label color
  const condition_labels = document.querySelectorAll('.label p');
  const time_labels = document.querySelectorAll('.label span');
  condition_labels.forEach(label => {
    label.classList.remove('highlight-color');
  });
  time_labels.forEach(label => {
    label.classList.remove('highlight-color');
  });
  condition_labels[5 - sliderValue].classList.add('highlight-color');
  time_labels[5 - sliderValue].classList.add('highlight-color');
}

/**
 * Computes the percentage of the slider's background color gauge.
 * @param {int} sliderValue 
 * @returns associated value between 0 and 100
 */
export function computePercentage(sliderValue) {
  return (sliderValue - 1) * 25;
}

/**
 * Converts sleep string to a value between 1 and 5
 * @param {String} val 
 * @returns associated value between 1 and 5
 */
export function sleepToValue(val) {
  switch (val) {
    case 'Excellent':
      return 5;
    case 'Good':
      return 4;
    case 'Fair':
      return 3;
    case 'Poor':
      return 2;
    case 'Worst':
      return 1;
    default:
      return 3;
  }
}