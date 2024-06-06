document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  slider.oninput = function() {
    const percentage = (this.value - this.min) / (this.max - this.min) * 100;
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
    time_labels[5 - (slider.value)].classList.add('highlight-color');
  }
  updateLabelColor();
  slider.addEventListener('input', updateLabelColor);
});