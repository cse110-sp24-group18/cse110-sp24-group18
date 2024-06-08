import { clearLocal, forceCreate, listFiles, createFile, getJournals, selectDate, deleteFile, filterDate, writeFile } from './fileSys.js';
import { updateText } from './textEditor.js';
import { setEmotion } from './emotion-widget.js';
import { setSleep } from './sleep-widget.js';
import { setLinesWidgetNumber } from './lines-of-code-script.js';

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

    const journalEntry = document.createElement('div'); // create a journal entry div to house the rest of the elements
    journalEntry.setAttribute('class', 'journalEntry');

    const button = document.createElement('button'); // button for entire journal element on side bar
    button.setAttribute('id', id); // id to keep track of the date of the entry
    if (listJournals[journal]['currentlySelected']) { // only one journal will be 'currentlySelected'
      button.setAttribute('class', 'currentlySelected'); // shade the current selection slightly different
      setEmotion(listJournals[journal]['mood']); // set the emotion of the widget to the current selected mood
      if (listJournals[journal]['sleep']) { // set the sleep of the widget to the current selected sleep
        setSleep(listJournals[journal]['sleep']);
      } else {
        setSleep('Fair'); // default the sleep value to 'Fair'
      }
      if (listJournals[journal]['linesCoded']) { // set the linesCoded of the widget to the current selected lines
        setLinesWidgetNumber(listJournals[journal]['linesCoded']);
      } else {
        setLinesWidgetNumber(5); // default the linesCoded of the widget to 5
      }
    }

    // construction of HTML label for the journal entries in side nav

    /**
     * Example of structure:
     *          <div class="journalEntry">
     *              <button id="2024-05-25" class="currentlySelected">
     *                  <text>
     *                      <span><h1>Title</h1></span>
     *                      <span><h3>2024-05-25</h3></span>
     *                  </text>
     *                  <delButton>
     *                      <div>
     *                          <span class="material-symbols-outlined">
     *                              Delete
     *                          </span>
     *                      </div>
     *                  </delButton>
     *              </button>
     *          </div>
     */

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

    navContainer.appendChild(journalEntry); // append the whole thing back to the navigation
  }
}

/**
 * Attatches event listeners to all buttons that update text.
 */
export function buttonListeners() {
  const navContainer = document.getElementById('nav-container'); // get navigation container
  const journalEntries = navContainer.querySelectorAll('.journalEntry'); // get all journal buttons
  journalEntries.forEach(journalEntryDiv => { // go through all journal buttons
    const journalButton = journalEntryDiv.querySelector('button');
    const id = journalButton.id; // take the current date of journal
    journalButton.addEventListener('click', function() {
      changeText(id); // change the text of text field based on data in queried data
      selectDate(id); // keep current journal selected
      loadButtons();
      buttonListeners();
    });

    // logic and construction of the delete button
    const deleteButton = journalEntryDiv.querySelector('delButton').querySelector('span');
    deleteButton.addEventListener('click', function() {
      const journals = getJournals();
      const deleteid = deleteButton.parentElement.parentElement.parentElement.id; // get the id of the overall div containing date
      deleteFile(deleteid); // deletes file from the current localStorage
      if (journals[deleteid]['currentlySelected']) { // handle case when deleted file is the currently selected file
        delete journals[deleteid];
        let journalArr = Object.values(journals);
        journalArr = journalArr.reverse();
        for (const journal in journalArr) {
          // get most recent journal entry and make that the selected one
          if (journalArr[journal]['filter'] && journal !== deleteid) {
            const journalDate = journalArr[journal]['date'];
            journals[journalDate]['currentlySelected'] = true;
            updateText(journalDate); // update the text editor field with most recent journal
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
  const yearsList = []; // list to house all years from journal entries
  for (const journal in journals) {
    const dateOf = new Date(journal);
    yearsList.push(dateOf.getFullYear()); // push every year as YYYY
  }
  const yearsSet = new Set(yearsList.sort()); // put into sorted set to get rid of duplicates

  const latestButton = document.getElementById('latest'); // button to sort by latest
  const earliestButton = document.getElementById('earliest'); // button to sort by earliest
  const yearSelect = document.getElementById('years'); // button to query by year
  const monthSelect = document.getElementById('months'); // button to query by month

  // year query construction in HTML
  /**
   * Example: replace options with only exisiting years within the journals
   * <select name="years" id="years">
   *    <option value="2020">2020</option>
   *    <option value="2021">2021</option>
   *    <option value="2022">2022</option>
   *    <option value="2023">2023</option>
   *    <option value="2024">2024</option>
   * </select>
   */
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

  latestButton.addEventListener('click', function() {
    sortByDateCreated(1); // call sort with param 1 (descending)
    buttonListeners(); // re-attatch event listeners
  });

  earliestButton.addEventListener('click', function() {
    sortByDateCreated(-1); // call sort with param not 1 (ascending)
    buttonListeners(); // re-attatch event listeners
  });

  yearSelect.addEventListener('change', function() {
    filterDate(yearSelect.value, letterMonthToNumber(monthSelect.value)); // on year or month change, filter by month and year
    loadButtons();
    buttonListeners();
  });

  monthSelect.addEventListener('change', function() {
    filterDate(yearSelect.value, letterMonthToNumber(monthSelect.value)); // on year or month change, filter by month and year
    loadButtons();
    buttonListeners();
  });
}

/**
 * Returns the value of a month between 1 to 12 depending on the month string
 * @param {String} monthStr 
 * @returns number associated with month string between 1 and 12
 */
export function letterMonthToNumber (monthStr) {
  const monthsArr = [1,2,3,4,5,6,7,8,9,10,11,12];
  const monthStrsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (const i in monthsArr) {
    if (monthStrsArr[i] === monthStr) { // return value on match
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
  const journals = getJournals();

  let count = 0;

  for (const journal in journals) {
    count++;
    console.log(journals[journal]);
  }

  if (count !== 0) {
    return;
  }

  clearLocal();
  // forceCreate(data, date, title, mood, sleep, linesCoded)
  forceCreate(
    'Today was great! I had a lot of sleep, and I did a lot of work! I felt amazing!',
    '2024-04-14',
    'My Wonderful Day',
    'AMAZING',
    'Excellent',
    10000);
  forceCreate(
    'Feeling overwhelmed with work today. Didn\'t get much sleep, but managed to push through. Need to find a better balance!',
    '2024-06-03',
    'Work Juggle',
    'SAD',
    'Fair',
    250
  );
  forceCreate(
    'Took a long walk in nature today. Feeling refreshed and recharged. Didn\'t code much, but needed the mental break.',
    '2024-05-20',
    'Nature Recharge',
    'HAPPY',
    'Excellent',
    50
  );
  forceCreate(
    'Finally cracked that coding challenge I\'ve been working on! Feeling accomplished and excited to learn more.',
    '2024-05-12',
    'Coding Breakthrough',
    'AMAZING',
    'Good',
    800
  );
  forceCreate(
    'Volunteered at a local charity today. Feeling good about giving back to the community.',
    '2024-04-25',
    'Giving Back',
    'HAPPY',
    'Good',
    20
  );
  forceCreate(
    'Not feeling well today. Stayed in bed most of the day. Hoping to feel better tomorrow.',
    '2024-04-01',
    'Under the Weather',
    'MISERABLE',
    'Poor',
    0
  );
  forceCreate(
    'Woke up to a power outage this morning. Made the best of it with some board games and candles. Kinda fun in a way!',
    '2024-05-30',
    'Power Outage Fun',
    'MEH',
    'Fair',
    0
  );
  forceCreate(
    'Had a great dinner party with friends last night. Lots of laughs and good food. Feeling happy and connected.',
    '2024-05-18',
    'Friends and Fun',
    'HAPPY',
    'Excellent',
    100
  );
  forceCreate(
    'Feeling inspired today! Wrote a few pages for my new story idea. Excited to see where it takes me.',
    '2024-06-02',
    'Creative Spark',
    'AMAZING',
    'Good',
    0
  );
  forceCreate(
    'Finally arrived in Amsterdam! Feeling a bit jet-lagged, but excited to explore this new city.',
    '2024-05-09',
    'Travel Day',
    'MEH',
    'Fair',
    50
  );
  forceCreate(
    'Started learning a new language today! Feeling challenged but motivated to keep practicing.',
    '2024-04-20',
    'New Language',
    'HAPPY',
    'Good',
    120
  );
  loadButtons();
  buttonListeners();
}

/**
 * Generates the journal for today with a blank title.
 */
export function generateToday() {
  createFile('');
}