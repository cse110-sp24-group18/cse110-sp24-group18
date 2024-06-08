export function widgetButtonListeners() {
  const widgetButtons = document.querySelectorAll('.widget-btn');

  widgetButtons.forEach((btn) => {
    // make sure all the widgets start closed
    const respectiveWidget = document.getElementById(btn.dataset.target);
    respectiveWidget.style.display = 'none';

    btn.addEventListener('click', () => {
      const targetWidget = document.getElementById(btn.dataset.target);

      if (targetWidget) {
        // If widget is closed, open
        if (targetWidget.style.display == 'none') {
          // close all the widgets
          widgetButtons.forEach((i) => {
            const widgetTemp = document.getElementById(i.dataset.target);
            widgetTemp.style.display = 'none';
            widgetTemp.style.right = '-30em';
            i.style.filter = 'brightness(1)';
          }); 
          targetWidget.style.display = 'flex';
          targetWidget.style.right = '35em';
          btn.style.filter = 'brightness(0.9)';
        }

        else {
          targetWidget.style.display = 'none';
          targetWidget.style.right = '-30em';
          btn.style.filter = 'brightness(1)';
        }
      }
    });
  });
}