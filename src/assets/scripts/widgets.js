import { returnChecked, writeFile, readFile } from './fileSys.js';
import { linesOfCodeListeners } from './lines-of-code-script.js';
import { emotionWidgetListeners } from './emotion-widget.js';
import { summaryInit } from './summary.js';

export function widgetButtonListeners() {
  const widgetButtons = document.querySelectorAll('.widget-btn');

  widgetButtons.forEach((btn) => {
    // make sure all the widgets start closed
    const respectiveWidget = document.getElementById(btn.dataset.target);
    respectiveWidget.style.display = 'none';

    btn.addEventListener('click', () => {
      const targetWidget = document.getElementById(btn.dataset.target);
      console.log(targetWidget.id);

      if (targetWidget) {
        // If widget is closed, open
        if (targetWidget.style.display === 'none') {
          // close all the widgets
          widgetButtons.forEach((i) => {
            const widgetTemp = document.getElementById(i.dataset.target);
            widgetTemp.style.display = 'none';
            widgetTemp.style.right = '-17em';
            i.style.filter = 'brightness(1)';
          });
          targetWidget.style.display = 'flex';
          targetWidget.style.right = '35em';
          btn.style.filter = 'brightness(0.9)';
        } else {
          targetWidget.style.display = 'none';
          targetWidget.style.right = '-17em';
          btn.style.filter = 'brightness(1)';
        }

      }
    });
  });

  // Close widgets when clicking outside
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.widget') && !event.target.closest('.widget-btn')) {
      document.querySelectorAll('.widget').forEach(widget => {
        widget.style.display = 'none';
        widget.style.right = '-30em';
      });
      document.querySelectorAll('.widget-btn').forEach(btn => {
        btn.style.filter = 'brightness(1)';
      });
    }
  });

  // Burger menu handling
  const toggle = document.getElementById('toggle1');
  const burgerMenu = document.querySelector('.burger-menu-container');

  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        burgerMenu.style.display = 'flex';
      } else {
        burgerMenu.style.display = 'none';
      }
    });
  }
  linesOfCodeListeners();
  emotionWidgetListeners();
  summaryInit();
}

export function updateChecked(widget, value, test = false) {
  if (test) return;
  const journalDate = returnChecked();
  console.log(journalDate);
  const journalEntry = readFile(journalDate);

  switch (widget) {
    case 'emotion':
      console.log('emotion widget set', value);
      journalEntry['mood'] = value;
      break;
    case 'sleep':
      console.log('sleep widget set', value);
      journalEntry['sleep'] = value;
      break;
    case 'linesCoded':
      console.log('lines coded widget set', value);
      journalEntry['linesCoded'] = value;
      break;
    default:
      console.log('error, defaulting on widget', value);
      break;
  }

  writeFile(journalEntry, journalDate);
}
