let currSpeed = 150;  // set currSpeed to 150 (centered by default)
let emotion = 'MEH'; // set emotion to 'MEH' (MEH by default)

/**
 * Initializes the gauge widget by setting up event listeners and defining behavior.
 */
export function initGaugeWidget() {
  const gauge = document.getElementById('gauge');
  if (!gauge) {
    console.error('Gauge element not found');
    return;
  }

  gauge.addEventListener('mousemove', (event) => {
    const faceImg = document.getElementById('face');
    const emotionText = document.getElementById('emotionText');
    const needle = document.getElementById('needle');

    if (!faceImg || !emotionText || !needle) {
      console.error('Required DOM elements not found');
      return;
    }

    const rect = gauge.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    if (angle >= 180 && angle <= 360) {
      const speed = (angle / 180) * 100;
      currSpeed = speed;

      if (speed >= 100 && speed < 120) {
        faceImg.src = 'assets/emotion-widget/media/faceMiserable.png';
        emotionText.textContent = 'Miserable';
        needle.style = '--score:20';
        gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,#9DABF4 36deg,'
          + 'var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      } else if (speed >= 120 && speed < 140) {
        faceImg.src = 'assets/emotion-widget/media/faceSad.png';
        emotionText.textContent = 'Sad';
        needle.style = '--score:35';
        gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1)36deg,'
        + '#E3985C 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      } else if (speed >= 140 && speed < 160) {
        faceImg.src = 'assets/emotion-widget/media/faceMeh.png';
        emotionText.textContent = 'Meh';
        needle.style = '--score:50';
        gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,'
        + 'var(--c2) 0 72deg,#D9BCB0 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);';
      } else if (speed >= 160 && speed < 180) {
        faceImg.src = 'assets/emotion-widget/media/faceGood.png';
        emotionText.textContent = 'Happy';
        needle.style = '--score:65';
        gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,'
        + 'var(--c2) 0 72deg,var(--c3) 0 108deg,#F4D39A 0 144deg,var(--c5) 0 180deg,#0000 0);';
      } else if (speed >= 180 && speed <= 200) {
        faceImg.src = 'assets/emotion-widget/media/faceAmazing.png';
        emotionText.textContent = 'Amazing';
        needle.style = '--score:80';
        gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,'
        + 'var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,#BED68B 0 180deg,#0000 0);';
      }
    }
  });

  gauge.addEventListener('mouseover', () => {
    gauge.addEventListener('click', () => {
      if (currSpeed >= 100 && currSpeed < 120) {
        emotion = 'MISERABLE';
      } else if (currSpeed >= 120 && currSpeed < 140) {
        emotion = 'SAD';
      } else if (currSpeed >= 140 && currSpeed < 160) {
        emotion = 'MEH';
      } else if (currSpeed >= 160 && currSpeed < 180) {
        emotion = 'HAPPY';
      } else if (currSpeed >= 180 && currSpeed <= 200) {
        emotion = 'AMAZING';
      }
    });
  });
}

/**
 * Get the User's selected emotion
 * @returns String representing selected emotion
 */
export function getEmotion() {
  return emotion;
}
