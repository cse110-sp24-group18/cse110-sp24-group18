import { generateExample, generateToday, filterButtons } from './journalNav.js';
import { textEditorListeners, setDate } from './textEditor.js';
import { attatchSplashListener } from './splashScreen.js';
import { widgetButtonListeners } from './widgets.js';

window.addEventListener('DOMContentLoaded', init); // set init to run on document load

/**
 * Runs this on document load.
 */
function init() {
  generateExample();
  generateToday();
  
  setDate();

  textEditorListeners();
  filterButtons();
  attatchSplashListener();

  widgetButtonListeners();
}