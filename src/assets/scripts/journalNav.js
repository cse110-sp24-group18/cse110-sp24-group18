import { clearLocal, forceCreate, listFiles, createFile, getJournals, selectDate, deleteFile, filterDate, writeFile } from './fileSys.js';
import { updateText } from './textEditor.js';

/**
 * Refreshes the file navigation with current journals in storage.
 */
export function loadButtons() {
  const navContainer = document.getElementById('nav-container'); // get the journals container
  navContainer.innerHTML = ''; // reset the HTML inside container
    
  const listJournals = listFiles(); // get all the journals as a dictionary

  const navButtonsList = document.createElement('ul'); // create list element to house journals
  navButtonsList.setAttribute('class', 'nav-buttons-list'); // set the class of list

  for (const journal in listJournals) { // generate each button for each journal

    if (listJournals[journal].filter === false) { // only render button if it passes a filter
      continue;
    }

    const id = listJournals[journal]['date']; // use the journal date as the key

    const journalEntry = document.createElement('div');
    journalEntry.setAttribute('class', 'journalEntry');

    const button = document.createElement('button');
    button.setAttribute('id', id);
    if (listJournals[journal]['currentlySelected']) {
      button.setAttribute('class', 'currentlySelected');
    }

    const text = document.createElement('text');

    const spanTitle = document.createElement('span');
    const title = document.createElement('h1');
    title.textContent = `${listJournals[journal]['title']}`;
    spanTitle.appendChild(title);

    const spanDate = document.createElement('span');
    const date = document.createElement('h3');
    date.textContent = `${journal}`;
    spanDate.appendChild(date);

    text.appendChild(spanTitle);
    text.appendChild(spanDate);

    const delButton = document.createElement('delButton');
    const delDiv = document.createElement('div');
    const delSpan = document.createElement('span');
    delSpan.textContent = 'Delete';
    delSpan.setAttribute('class', 'material-symbols-outlined');
    delDiv.appendChild(delSpan);
    delButton.appendChild(delDiv);

    button.appendChild(text);
    button.appendChild(delButton);

    journalEntry.appendChild(button);

    navContainer.appendChild(journalEntry);
  }
}

export function returnColorForMood(mood) {
  switch (mood) {
    case 'neutral':
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
    case 'angry':
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
    case 'happy':
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
    case 'sad':
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
    case 'excited':
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
    default:
      return {'background':'#FFFFFF', 'text':'#195B8B', 'desc':'#1A76AE', 'mod':'#1A76AE', 'icon-top':'#195B8B', 'icon-bot':'#1CB6F0'};
  }
}

/**
 * 
 * switch (mood) {
        case 'neutral':
            return {'background':'#C9F6FF', 'text':'#84A2A8', 'desc':'#9CBFC6', 'mod':'#70898E', 'icon-top':'#91D0DC', 'icon-bot':'#63BBCC'};
        case 'angry':
            return {'background':'#FBC3BC', 'text':'#A27F7A', 'desc':'#C19791', 'mod':'#886A66', 'icon-top':'#E6958B', 'icon-bot':'#D77265'};
        case 'happy':
            return {'background':'#C7F9CC', 'text':'#82A285', 'desc':'#9AC19F', 'mod':'#6C8870', 'icon-top':'#93E39B', 'icon-bot':'#63D06E'};
        case 'sad':
            return {'background':'#e2c9ff', 'text':'#9584A8', 'desc':'#AF9CC6', 'mod':'#7E708D', 'icon-top':'#B892E4', 'icon-bot':'#925ED0'};
        case 'excited':
            return {'background':'#fffec9', 'text':'#A8A784', 'desc':'#C6C49C', 'mod':'#8D8B6F', 'icon-top':'#DFDE8A', 'icon-bot':'#CBC957'};
        default:
            return {'background':'#C9F6FF', 'text':'#84A2A8', 'desc':'#9CBFC6', 'mod':'#70898E', 'icon-top':'#91D0DC', 'icon-bot':'#63BBCC'};
    }
 */

/**
 * Attatches event listeners to all buttons that update text.
 */
export function buttonListeners() {
  const navContainer = document.getElementById('nav-container'); // get navigation container
  const journalEntries = navContainer.querySelectorAll('.journalEntry'); // get all journal buttons
  journalEntries.forEach(journalEntryDiv => { // go through all journal buttons
    const journalButton = journalEntryDiv.querySelector('button');
    const id = journalButton.id; // take the current date of journal
    journalButton.addEventListener('click', function(event) {
      changeText(id); // change the text of text field based on data in queried data
      selectDate(id); // keep current journal selected
      loadButtons();
      buttonListeners();
    });

    const deleteButton = journalEntryDiv.querySelector('delButton').querySelector('span');
    deleteButton.addEventListener('click', function(event) {
      const journals = getJournals();
      const deleteid = deleteButton.parentElement.parentElement.parentElement.id;
      deleteFile(deleteid);
      if (journals[deleteid]['currentlySelected']) {
        delete journals[deleteid];
        let journalArr = Object.values(journals);
        journalArr = journalArr.reverse();
        for (const journal in journalArr) {
          if (journalArr[journal]['filter'] && journal != deleteid) {
            const journalDate = journalArr[journal]['date'];
            journals[journalDate]['currentlySelected'] = true;
            updateText(journalDate);
            writeFile(journals[journalDate], journalDate);
          }
        }
      }
      loadButtons();
      buttonListeners();
    });
  });
}

/**
 * Updates text in a text div.
 * @param {string} date date to query
 */
function changeText(date) {
  console.log(`Changing text area: '${date}'.`);
  updateText(date);
}

/**
 * Adds event listeners to all filtering buttons.
 */
export function filterButtons() {
  const journals = getJournals();
  const yearsList = [];
  for (const journal in journals) {
    const dateOf = new Date(journal);
    yearsList.push(dateOf.getFullYear());
  }
  const yearsSet = new Set(yearsList.sort());

  const latestButton = document.getElementById('latest'); // button to sort by latest
  const earliestButton = document.getElementById('earliest'); // button to sort by earliest
  const yearSelect = document.getElementById('years');
  const monthSelect = document.getElementById('months');

  yearSelect.innerHTML = '';
  const yearsArr = Array.from(yearsSet);
  for (const year in yearsArr) {
    const newOption = document.createElement('option');
    newOption.value = yearsArr[year];
    newOption.textContent = `${yearsArr[year]}`;
    yearSelect.appendChild(newOption);
  }

  // init
  latestButton.checked = true; // default to descending order
  sortByDateCreated(1); // call sort with param 1 (descending)
  buttonListeners(); // re-attatch event listeners

  latestButton.addEventListener('click', function(event) {
    sortByDateCreated(1); // call sort with param 1 (descending)
    buttonListeners(); // re-attatch event listeners
  });

  earliestButton.addEventListener('click', function(event) {
    sortByDateCreated(-1); // call sort with param not 1 (ascending)
    buttonListeners(); // re-attatch event listeners
  });

  yearSelect.addEventListener('change', function(event) {
    filterDate(yearSelect.value, letterMonthToNumber(monthSelect.value));
    loadButtons();
    buttonListeners();
  });

  monthSelect.addEventListener('change', function(event) {
    filterDate(yearSelect.value, letterMonthToNumber(monthSelect.value));
    loadButtons();
    buttonListeners();
  });
}

export function letterMonthToNumber (monthStr) {
  const monthsArr = [1,2,3,4,5,6,7,8,9,10,11,12];
  const monthStrsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (const i in monthsArr) {
    if (monthStrsArr[i] === monthStr) {
      return monthsArr[i];
    }
  }
  return -1;
}


/**
 * Sorts files by date created and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
export function sortByDateCreated(val) {
  const journals = getJournals(); // dictionary of all journals
  const entries = Object.entries(journals); // convert dict to object to sort
    
  // sort ascending or descending based on parameter
  if (val === 1) { // 1 for descending (default)
    entries.sort((a,b) => b[1].date.localeCompare(a[1].date)); // comparison
    console.log('Sort by descending');
  } else { // anything else for ascending
    entries.sort((a,b) => a[1].date.localeCompare(b[1].date));
    console.log('Sort by ascending');
  }
  const sorted = Object.fromEntries(entries); // convert back to dictionary
  const jsonString = JSON.stringify(sorted); // stringify and update local storage
  localStorage.setItem('journals', jsonString);
  loadButtons(); // regenerate all buttons
}

/**
 * Sorts files by date last modified and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
export function sortByLastModified(val) {
  const journals = getJournals(); // dictionary of all journals
  const entries = Object.entries(journals); // convert dict to object to sort

  // sort ascending or descending based on parameter
  if (val === 1) { // 1 for descending (default)
    entries.sort((a,b) => b[1].lastMod.localeCompare(a[1].lastMod)); // comparison
    console.log('Sort by descending');
  } else { // anything else for ascending
    entries.sort((a,b) => a[1].lastMod.localeCompare(b[1].lastMod));
    console.log('Sort by ascending');
  }
  const sorted = Object.fromEntries(entries); // convert back to dictionary
  const jsonString = JSON.stringify(sorted); // stringify and update local storage
  localStorage.setItem('journals', jsonString);
  loadButtons(); // regenerate all buttons
}

/**
 * Generates an example.
 */
export function generateExample() {
  clearLocal();
  forceCreate('What is this? Where am I?', '2024-04-14', 'Who are you?', 'angry');
  forceCreate('I hope this works!', '2024-05-18', 'yay!', 'excited');
  forceCreate('This is a test!', '2024-04-23', 'This is not a drill', 'happy');
  forceCreate('Hello there', '2024-05-15', 'Hi', 'sad');
  forceCreate('Graphic design is my passion', '2024-04-19', 'test', 'excited');
  forceCreate('Flexpidition', '2024-05-10', '', 'angry');
  forceCreate('trettggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', '2024-05-09', 'long word', 'happy');
  forceCreate('this is a test this is a test this is a test this is a test this is a test', '2024-05-08', 'long sentence', 'neutral');
  loadButtons();
  buttonListeners();
}

export function generateToday() {
  createFile('');
}