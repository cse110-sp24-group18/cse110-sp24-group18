import { generateExample, generateToday, filterButtons } from './journalNav.js';
import { textEditorListeners, setDate } from './textEditor.js';
import { attatchSplashListener } from './splashScreen.js';
import { widgetButtonListeners } from './widgets.js';
import { getEmotion, initGaugeWidget } from '../emotion-widget/emotion-widget.js';

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

  initGaugeWidget();
  window.getEmotion = getEmotion;

}