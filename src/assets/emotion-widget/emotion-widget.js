const gauge = document.getElementById('gauge'); // get the gauge element
// const gaugeValue = document.getElementById('score'); // get the score element (testing)
let currSpeed = 150;  // set currSpeed to 150 (centered by default)
let emotion = 'MEH'; // set emotion to 'MEH' (MEH by default)

gauge.addEventListener('mousemove', (event) => {
  
  const faceImg = document.getElementById('face');  // get the face image element
  const emotionText = document.getElementById('emotionText'); // get the emotion text element
  const needle = document.getElementById('needle'); // get the gauge needle element

  // Grab variables to track mouse location
  const rect = gauge.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const deltaX = x - centerX;
  const deltaY = y - centerY;

  // Calculate the angle from the center to the mouse position
  let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  if (angle < 0) angle += 360;

  // Only consider angles between 180 and 360 degrees
  if (angle >= 180 && angle <= 360) {
    const speed = (angle / 180) * 100;
    currSpeed = speed;
    // gaugeValue.textContent = `${Math.round(speed) - 100}`;

    if (speed >= 100 && speed < 120) {  // if mouse is in MISERABLE section
      faceImg.src = 'assets/emotion-widget/media/faceMiserable.png';  // change the face image to MISERABLE
      emotionText.textContent = 'Miserable';  // change the text below face image to 'Miserable'
      needle.style = '--score:20'; // change the needle score (points toward MISERABLE section of gauge)
      gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,#9DABF4 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);'; // brighten MISERABLE section color on mouse hover
    }
    else if (speed >= 120 && speed < 140) { // if mouse is in SAD section
      faceImg.src = 'assets/emotion-widget/media/faceSad.png';  // change the face image to SAD
      emotionText.textContent = 'Sad';  // change the text below face image to 'Sad'
      needle.style = '--score:35'; // change the needle score (points toward SAD section of gauge)
      gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,#E3985C 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);'; // brighten SAD section color on mouse hover
    }
    else if (speed >= 140 && speed < 160) { // if mouse is in MEH section
      faceImg.src = 'assets/emotion-widget/media/faceMeh.png';  // change the face image to MEH
      emotionText.textContent = 'Meh';  // change the text below face image to 'Meh'
      needle.style = '--score:50'; // change the needle score (points toward MEH section of gauge)
      gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,#D9BCB0 0 108deg,var(--c4) 0 144deg,var(--c5) 0 180deg,#0000 0);'; // brighten MEH section color on mouse hover
    }
    else if (speed >= 160 && speed < 180) { // if mouse is in HAPPY section
      faceImg.src = 'assets/emotion-widget/media/faceGood.png'; // change the face image to HAPPY
      emotionText.textContent = 'Happy';  // change the text below face image to 'Happy'
      needle.style = '--score:65'; // change the needle score (points toward HAPPY section of gauge)
      gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,#F4D39A 0 144deg,var(--c5) 0 180deg,#0000 0);'; // brighten HAPPY section color on mouse hover
    }
    else if (speed >= 180 && speed <= 200) {  // if mouse is in AMAZING section
      faceImg.src = 'assets/emotion-widget/media/faceAmazing.png';  // change the face image to AMAZING
      emotionText.textContent = 'Amazing';  // change the text below face image to 'Amazing'
      needle.style = '--score:80'; // change the needle score (points toward AMAZING section of gauge)
      gauge.style = 'background: radial-gradient(#f8f4f3 0 0) content-box,conic-gradient(from -90deg,var(--c1) 36deg,var(--c2) 0 72deg,var(--c3) 0 108deg,var(--c4) 0 144deg,#BED68B 0 180deg,#0000 0);'; // brighten AMAZING section color on mouse hover
    }

  } 

});

gauge.addEventListener('mouseover', () => {
  gauge.addEventListener('click', () => {
    if (currSpeed >= 100 && currSpeed < 120) {
      emotion = 'MISERABLE';  // set emotion to 'MISERABLE' on click of MISERABLE section
    }
    else if (currSpeed >= 120 && currSpeed < 140) {
      emotion = 'SAD';  // set emotion to 'SAD' on click of SAD section
    }
    else if (currSpeed >= 140 && currSpeed < 160) {
      emotion = 'MEH';  // set emotion to 'MEH' on click of MEH section
    }
    else if (currSpeed >= 160 && currSpeed < 180) {
      emotion = 'HAPPY';  // set emotion to 'HAPPY' on click of HAPPY section
    }
    else if (currSpeed >= 180 && currSpeed <= 200) {
      emotion = 'AMAZING';  // set emotion to 'AMAZING' on click of AMAZING section
    }
  });
});

/**
 * Get the User's selected emotion
 * @returns String representing selected emotion
 */
function getEmotion() {
  return emotion;
}