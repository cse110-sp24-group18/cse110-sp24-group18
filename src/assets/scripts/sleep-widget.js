import { updateChecked } from "./widgets.js";

const slider = document.querySelector('.slider');
const condition_labels = document.querySelectorAll('.label p');
const time_labels = document.querySelectorAll('.label span');
slider.value = 3;  

slider.addEventListener('input', (event) => {
  var currentSleep = valueToSleep(slider.value)
  setSleep(currentSleep)
});

export function setSleep(currentSleep) {
  //change background color of the slider.
  var sliderValue = sleepToValue(currentSleep);
  var percentage = (sliderValue - 1) * 25;
  slider.style.background = `linear-gradient(to right, #FF5C35 0%, #FF5C35 ${percentage}%, #e5dedb ${percentage}%, #e5dedb 100%)`;

  //change selected label color
  condition_labels.forEach(label => {
    label.classList.remove('highlight-color');
  });
  time_labels.forEach(label => {
    label.classList.remove('highlight-color');
  });
  condition_labels[5 -sliderValue].classList.add('highlight-color');
  time_labels[5 - sliderValue].classList.add('highlight-color');

  //update checked
  updateChecked('sleep', sliderValue)
}


function valueToSleep(val) {
  switch (val) {
    case '5':
      return 'Excellent';
    case '4':
      return 'Good';
    case '3':
      return 'Fair';
    case '2':
      return 'Poor';
    case '1':
      return 'Worst';
    default:
        return 'Fair';
  }
}

function sleepToValue(val) {
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