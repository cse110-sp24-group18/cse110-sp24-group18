/**
 * Attatches the on click listener to make splash screen move
 */
export function attatchSplashListener() {
  const splashScreen = document.getElementById('splash-container');

  splashScreen.addEventListener('click', function() {
    splashScreen.classList.add('slide-up');
    const style = document.getElementById('splashScreenLock');
    style.disabled = true;
  });
}