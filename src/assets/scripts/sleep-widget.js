import { updateChecked } from './widgets.js';

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  slider.oninput = function() {
    const percentage = computePercentage(this.value);
    this.style.background = `linear-gradient(to right, #FF5C35 0%, #FF5C35 ${percentage}%, #e5dedb ${percentage}%, #e5dedb 100%)`;
  };
  slider.value = 3;  
  slider.dispatchEvent(new Event('input')); 
  
  
  //chanage a label color
  const condition_labels = document.querySelectorAll('.label p');
  const time_labels = document.querySelectorAll('.label span');
  function updateLabelColor() {
    condition_labels.forEach(label => {
      label.classList.remove('highlight-color');
    });
    time_labels.forEach(label => {
      label.classList.remove('highlight-color');
    });
    condition_labels[5 - (slider.value)].classList.add('highlight-color');
    updateChecked('sleep', condition_labels[5 - (slider.value)].textContent);
    time_labels[5 - (slider.value)].classList.add('highlight-color');
  }
  updateLabelColor();
  slider.addEventListener('input', updateLabelColor);
});

export function setSleep(currentSleep) {
  // for taiki, make this set the sleep gauge state based on sleep input 'currentSleep' which is a string e.g. 'Excellent'
  
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

export function computePercentage(sliderValue) {
  return (sliderValue - 1) * 25;
}

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