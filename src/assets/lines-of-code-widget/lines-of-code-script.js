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
  adjustFontSize();
}

function decrement() {
  const numberElement = document.getElementById('number');
  let count = parseInt(numberElement.value, 10);
  count--;
  count = count < 0 ? 0 : count;
  numberElement.value = count;
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
  adjustFontSize();
}
function confirm() {
    const widgetElement = document.querySelector('.lines-widget-content');
    widgetElement.innerHTML = `
        <canvas id="confetti-canvas"></canvas>
        <div class="confirmation-message">
            <h3>Great Work</h3>
            <h3>Today!!</h3>
            <div class="emoji">😆</div>
        </div>
    `;
    launchConfetti();
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const confettiInstance = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    const colors = ['#0000ff', '#1e90ff', '#00bfff'];

    (function frame() {
        confettiInstance({
            particleCount: 7,
            angle: 90,
            spread: 70,
            origin: { x: 0.5, y: 0 },
            colors: colors,
            shapes: ['circle'],
            scalar: 1.2,
            drift: 0,
            ticks: 200
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

module.exports = {increment, decrement, updateNumber, adjustFontSize, confirm };
