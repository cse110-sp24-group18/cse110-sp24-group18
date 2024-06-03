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

function arrayToBarGraph(arr, widget, max) {
  const barGraph = document.getElementById(widget);
  barGraph.innerHTML = '';
  const noElements = arr.length;
  let maxVal = 0;
  for (let i = 0; i < noElements; i++) {
    let barVal = arr[i];
    if (barVal > maxVal) {
      maxVal = barVal;
    }
    if (max) {
      const barOnGraph = document.createElement('div');
      barOnGraph.className = 'bar';
      if (barVal > max) {
        barVal = max;
      }
      const percentage = barVal / max * 100;
      barOnGraph.style = `height: ${percentage}%;`;
      setBarGradient(barOnGraph);

      barGraph.appendChild(barOnGraph);
    }
  }
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

function getMostRecent(amount) {
  const journals = getJournals();
  const arrayJournals = [];
  let count = 0;
  const datesSorted = getSortedDates(journals);
  for (const date in datesSorted) {
    if (count === amount) {
      break;
    }
    arrayJournals.push(journals[datesSorted[date]]);
    count++;
  }
  return arrayJournals;
}

function getSortedDates(dictionary) {
  const dates = Object.keys(dictionary);
  
  dates.sort((a, b) => new Date(b) - new Date(a));
  
  return dates;
}

function getLinesCodedArray(dict) {
  const arr = [];
  for (const journal in dict) {
    let lines = dict[journal]['linesCoded'];
    if (!lines) {
      lines = 0;
    }
    arr.push(lines);
  }
  console.log('Lines ARR: ', arr);
  return arr;
}

function getSleepArray(dict) {
  const arr = [];
  for (const journal in dict) {
    let lines = sleepToValue(dict[journal]['sleep']);
    if (!lines) {
      lines = 0;
    }
    arr.push(lines);
  }
  console.log('Sleep ARR: ', arr);
  return arr;
}

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

function journalsToEmotions(arrDicts) {
  const arrEmotions = [];
  for (let i = 0; i < arrDicts.length; i++) {
    arrEmotions.push([arrDicts[i]['date'], arrDicts[i]['mood']]);
  }
  console.log('EMOTIONS:', arrEmotions);
  return arrEmotions;
}

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