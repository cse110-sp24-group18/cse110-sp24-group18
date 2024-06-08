// Initialize the count for lines of code with a default value
let count = 5;
// Get the input element and widget element
const numberElement = document.getElementById('number');
const widgetElement = document.querySelector('.widget');

// Function to increment the count and update the input field
function increment() {
  count++;
  numberElement.value = count;
}

// Function to decrement the count and update the input field
function decrement() {
  count--;
  numberElement.value = count;
}

// Function to update the count based on the input field value
function updateNumber() {
  count = parseInt(numberElement.value) || 0;
}

// Function to confirm the count and display the confetti animation
function confirm() {
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

// Function to launch the confetti animation
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const confettiInstance = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });
  const duration = 2 * 1000; // Duration of the confetti animation in milliseconds
  const end = Date.now() + duration;
  const colors = ['#0000ff', '#1e90ff', '#00bfff']; // Colors of the confetti particles

  // Recursive function to animate the confetti
  (function frame() {
    confettiInstance({
      particleCount: 7, // Number of particles per frame
      angle: 90, // Angle of the confetti
      spread: 70, // Spread of the confetti
      origin: { x: 0.5, y: 0 }, // Origin point of the confetti
      colors: colors,
      shapes: ['circle'], // Shape of the confetti particles
      scalar: 1.2, // Size scale of the particles
      drift: 0, // Horizontal drift of the particles
      ticks: 200 // Lifetime of the particles
    });

    // Continue the animation until the duration ends
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}