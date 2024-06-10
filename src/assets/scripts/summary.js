import { getJournals } from './fileSys.js';

export function summaryInit() {
  document.querySelector('.dropbtn').addEventListener('click', function() { // Add a click event listener to the dropdown button
    setEmotionImages(journalsToEmotions(getMostRecent(7)));
    arrayToBarGraph(getLinesCodedArray(getMostRecent(7)), 'lines-coded-summary');
    arrayToBarGraph(getSleepArray(getMostRecent(7)), 'sleep-summary', 5);
    document.querySelector('.dropdown-content').classList.toggle('show'); // Toggle the 'show' class on the dropdown content when the button is clicked
  });

  window.onclick = function(event) {     // Close the dropdown if the user clicks outside of it
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content'); // Loop through all dropdown contents and remove the 'show' class if it's present
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  // Apply the gradient to all bars
  document.querySelectorAll('.bar').forEach(bar => {
    setBarGradient(bar);
  });
}

/**
 * 
 * @param {*} bar 
 */
function setBarGradient(bar) {    // Function to set the gradient background of a bar based on its height percentage
  const heightPercentage = parseInt(bar.style.height);
  let color;

  if (heightPercentage < 40) {    // Set the color gradient based on the height percentage
    color = 'linear-gradient(to top, #ff4c4c, #ff6666)'; // Red shades for lower percentages
  } else if (heightPercentage < 70) {
    color = 'linear-gradient(to top, #ffcc00, #ffdd66)'; // Yellow shades for medium percentages
  } else {
    color = 'linear-gradient(to top, #4caf50, #66bb6a)'; // Green shades for higher percentages
  }

  bar.style.backgroundImage = color;  // Apply the color gradient to the bar
}

/**
 * Converts an a given array into a bar graph structure in HTML
 * @param {Array} arr Array of numbers to turn into bar graph
 * @param {String} widget Widget tag to generate class of
 * @param {number} max Maximum value of numbers
 */
function arrayToBarGraph(arr, widget, max) {

  // generate widget based on parameter
  const barGraph = document.getElementById(widget);
  barGraph.innerHTML = '';

  const noElements = arr.length; // number of total elements, bar for each
  let maxVal = 0;

  // either get the max value of all bar values or 
  for (let i = 0; i < noElements; i++) {
    let barVal = arr[i];

    // set the max bar value for percentage purposes
    if (barVal > maxVal) {
      maxVal = barVal;
    }

    // check for a max parameter to set percentages
    if (max) {
      const barOnGraph = document.createElement('div');
      barOnGraph.className = 'bar';

      // ceiling the values to the max param
      if (barVal > max) {
        barVal = max;
      }

      // set the percentage to the height of the bar visual
      const percentage = barVal / max * 100;
      barOnGraph.style = `height: ${percentage}%;`;
      setBarGradient(barOnGraph);

      barGraph.appendChild(barOnGraph);
    }
  }

  // if there is no max param, use the largest value as the max param
  if (!max) {
    for (let i = 0; i < noElements; i++) {
      const barVal = arr[i];
      const barOnGraph = document.createElement('div');
      barOnGraph.className = 'bar';
      const percentage = barVal / maxVal * 100;
      barOnGraph.style = `height: ${percentage}%;`;
      setBarGradient(barOnGraph);

      barGraph.appendChild(barOnGraph);
    }
  }
}

/**
 * Gets the most recent
 * @param {number} amount Amount of journals to get
 * @returns Array of recent journals
 */
function getMostRecent(amount) {
  const journals = getJournals();
  const arrayJournals = [];
  let count = 0;
  const datesSorted = getSortedDates(journals);

  // loop through journals and get all the most recent dates, break loop once limit reached
  for (const date in datesSorted) {
    if (count === amount) {
      break;
    }
    arrayJournals.push(journals[datesSorted[date]]);
    count++;
  }
  return arrayJournals;
}

/**
 * Sorts a dictionary based on date
 * @param {dict} dictionary dictionary of journals
 * @returns sorted dictionary
 */
function getSortedDates(dictionary) {
  const dates = Object.keys(dictionary);
  
  dates.sort((a, b) => new Date(b) - new Date(a));
  
  return dates;
}

/**
 * Get lines coded values from dict
 * @param {dict} dict dictionary of journals
 * @returns array of lines coded values
 */
function getLinesCodedArray(dict) {
  const arr = [];
  for (const journal in dict) {
    let lines = dict[journal]['linesCoded'];
    if (!lines) {
      lines = 0;
    }
    arr.push(lines);
  }
  return arr;
}

/**
 * Get sleep values from dict
 * @param {dict} dict dictionary of journals
 * @returns array of sleep values
 */
function getSleepArray(dict) {
  const arr = [];
  for (const journal in dict) {
    let lines = sleepToValue(dict[journal]['sleep']);
    if (!lines) {
      lines = 0;
    }
    arr.push(lines);
  }
  return arr;
}

/**
 * Returns a sleep number based on the string
 * @param {String} val 
 * @returns number associated with sleep string
 */
function sleepToValue(val) {
  switch (val) {
    case 'Excellent':
      return 5;
    case 'Good':
      return 4;
    case 'Fair':
      return 3;
    case 'Poor':
      return 2;
    case 'Worst':
      return 1;
    default:
      return 3;
  }
}

/**
 * Get emotions from journals
 * @param {dict} arrDicts array of journals
 * @returns array of ['date', 'mood'] arrays
 */
function journalsToEmotions(arrDicts) {
  const arrEmotions = [];
  for (let i = 0; i < arrDicts.length; i++) {
    arrEmotions.push([arrDicts[i]['date'], arrDicts[i]['mood']]);
  }
  return arrEmotions;
}

/**
 * Set the emotion images based on array of emotion strings
 * @param {Array} arr array of ['date', 'mood'] arrays
 */
function setEmotionImages(arr) {
  const moodBox = document.getElementById('mood-box');
  moodBox.innerHTML = '';
  const moodTitle = document.createElement('h3');
  moodTitle.textContent = 'Mood History';
  moodBox.appendChild(moodTitle);

  const moodDiv = document.createElement('div');
  moodDiv.className = 'week';

  const emotionDiv = document.getElementById('sleep-week');
  const sleepDiv = document.getElementById('lines-week');

  emotionDiv.innerHTML = '';
  sleepDiv.innerHTML = '';

  // loop through array and create HTML elements with associated date and emotion image
  for (let i = 0; i < arr.length; i++) {
    const moodJournal = document.createElement('div');
    moodJournal.className = 'day';
    const journalDay = document.createElement('p');
    const linesDay = document.createElement('p');
    const sleepDay = document.createElement('p');

    journalDay.textContent = arr[i][0].slice(-5);
    linesDay.textContent = arr[i][0].slice(-5);
    sleepDay.textContent = arr[i][0].slice(-5);

    const journalIcon = document.createElement('img');
    journalIcon.src = moodToSrc(arr[i][1]);
    journalIcon.alt = arr[i][1];
    journalIcon.className = 'mood-icon';

    moodJournal.appendChild(journalDay);
    emotionDiv.appendChild(linesDay);
    sleepDiv.appendChild(sleepDay);

    moodJournal.appendChild(journalIcon);

    moodDiv.appendChild(moodJournal);
  }

  moodBox.appendChild(moodDiv);
}

/**
 * Get the image source depending on the emotion string
 * @param {String} mood 
 * @returns source of image for emotion
 */
function moodToSrc(mood) {
  switch (mood) {
    case 'AMAZING':
      return 'assets/emotion-widget/media/faceAmazing.png';
    case 'HAPPY':
      return 'assets/emotion-widget/media/faceGood.png';
    case 'MEH':
      return 'assets/emotion-widget/media/faceMeh.png';
    case 'SAD':
      return 'assets/emotion-widget/media/faceSad.png';
    case 'MISERABLE':
      return 'assets/emotion-widget/media/faceMiserable.png';
    default:
      return 'assets/emotion-widget/media/faceAmazing.png';
  }
}