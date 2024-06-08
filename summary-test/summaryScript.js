window.addEventListener('DOMContentLoaded', init);

function init() {
  const summaryContainer = document.getElementById('summary-container');
  const wrapper = document.getElementsByClassName('sleep-wrapper')[0];

  const sleepChart = document.getElementById('sleep-chart');

  const pullDownButton = document.getElementById('pull-down-summary');

  pullDownButton.addEventListener('click', function(event) {
    if (!sleepChart.classList.contains('animate-sleep-chart')) {
      sleepChart.classList.add('animate-sleep-chart');
      sleepChart.classList.add('slide-start');
      sleepChart.classList.remove('slide-end');

    } else {
      sleepChart.classList.remove('animate-sleep-chart');
      sleepChart.classList.remove('slide-start');
      sleepChart.classList.add('slide-end');
    }
  });
}