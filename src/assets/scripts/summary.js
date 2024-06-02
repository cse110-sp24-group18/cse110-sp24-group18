import { getJournals } from "./fileSys.js";

document.addEventListener('DOMContentLoaded', (event) => { // Event listener for when the DOM content is fully loaded
    document.querySelector('.dropbtn').addEventListener('click', function() { // Add a click event listener to the dropdown button
      arrayToBarGraph(getLinesCodedArray(getMostRecent(7)), 'lines-coded-summary');
      arrayToBarGraph(getSleepArray(getMostRecent(7)), 'sleep-summary');
      document.querySelector('.dropdown-content').classList.toggle('show'); // Toggle the 'show' class on the dropdown content when the button is clicked
    });

    window.onclick = function(event) {     // Close the dropdown if the user clicks outside of it
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content"); // Loop through all dropdown contents and remove the 'show' class if it's present
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

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

    // Apply the gradient to all bars
    document.querySelectorAll('.bar').forEach(bar => {
      setBarGradient(bar);
    });
  });

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
        barVal = max
      }
      const percentage = barVal / max * 100;
      barOnGraph.style = `height: ${percentage}%;`;

      barGraph.appendChild(barOnGraph);
    }
  }
  if (!max) {
    for (let i = 0; i < noElements; i++) {
      let barVal = arr[i];
      const barOnGraph = document.createElement('div');
      barOnGraph.className = 'bar';
      const percentage = barVal / maxVal * 100;
      barOnGraph.style = `height: ${percentage}%;`;

      barGraph.appendChild(barOnGraph);
    }
  }
}

function getMostRecent(amount) {
  const journals = getJournals();
  let arrayJournals = [];
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
  let arr = [];
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
  let arr = [];
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