/**
 * Creates a file with basic text data.
 * @param {string} data text associated with date
 */
export function createFile(data) {
  const dateToday = formatToday(); // todays date
  const journals = getJournals(); // dictionary of all journals
  const defaultTitle = dateToday; // default title when there is no title
    
  const templateJson = { // template for data
    'data': data, // text data
    'date': dateToday, // date of creation
    'lastMod': dateToday, // date of modification
    'title': defaultTitle, // title for journal
    'filter': true, // whether a journal passes filter
    'mood': 'neutral', // mood on the day
    'currentlySelected': false // current selection
  };

  if (dateToday in journals) { // deny creation if journal day exists
    console.log('Date already exists.');
  } else { 
    journals[dateToday] = templateJson; // generate journal based off template
    const jsonString = JSON.stringify(journals); // stringify the dictionary to store
    localStorage.setItem('journals', jsonString); // store in local storage
    console.log(`Created JSON file: '${dateToday}' and added to localStorage.`);
  }
}

/**
 * Force create a file with given data, date and a title.
 * @param {string} data text associated with date
 * @param {string} date date created
 * @param {string} title display title
 */
export function forceCreate(data, date, title, mood) {
  const dateToday = formatToday(); // same as createFile() with ability to set certain fields
  const journals = getJournals();

  if (!title) {
    title = 'Untitled';
  }

  if (!mood) {
    mood = 'neutral';
  }

  const templateJson = {
    'data': data,
    'date': date,
    'lastMod': dateToday,
    'title': title,
    'filter': true,
    'mood': mood,
    'currentlySelected': false
  };

  if (date in journals) {
    console.log('Date already exists.');
  } else {
    journals[date] = templateJson;
    const jsonString = JSON.stringify(journals);
    localStorage.setItem('journals', jsonString);
    console.log(`Force created JSON file: '${date}' and added to localStorage.`);
  }
}

export function selectDate(date) {
  const journals = getJournals();
  for (const journal in journals) {
    if (journal === date) {
      journals[journal]['currentlySelected'] = true;
    } else {
      journals[journal]['currentlySelected'] = false;
    }
  }
  const jsonString = JSON.stringify(journals);
  localStorage.setItem('journals', jsonString);
}

/**
 * Writes new data to a current file.
 * @param {dict} newData replacement data
 * @param {string} date date to query
 */
export function writeFile(newData, date) {
  const dateToday = formatToday(); // todays date
  const journals = getJournals(); // dictionary of all journals

  if (date in journals) { // check if journal exists
    journals[date] = newData; // rewrite data field
    journals[date]['lastMod'] = dateToday; // update last modified date
    const jsonString = JSON.stringify(journals); // stringify and add to local storage
    localStorage.setItem('journals', jsonString);
    console.log(`Modified JSON file: '${date}' and added to localStorage.`);
  } else { // if it doesn't exist
    forceCreate(newData['data'], date); // create a file on the day with text data
    writeFile(newData, date); // write to newly created file with all data
  }
}

/**
 * Deletes a given file.
 * @param {string} date date to query
 */
export function deleteFile(date) {
  const journals = getJournals(); // dictionary of all journals

  if (date in journals) { // check that journal exists
    delete journals[date]; // delete the journal
    const jsonString = JSON.stringify(journals); // stringify and update local storage
    localStorage.setItem('journals', jsonString);
    console.log(`Deleted JSON file: '${date}'.`);
  } else {
    console.log(`File ${date} not found.`);
  }
}

/**
 * Reads a file.
 * @param {string} date date to query
 * @returns dict of journal at given date, or null if it does not exist
 */
export function readFile(date) {
  const journals = getJournals(); // dictionary of all journals

  if (date in journals) { // check that journal exists
    console.log(`Reading JSON file: '${date}'.`);
    return journals[date]; // return journal
  } else {
    console.log(`File '${date}' not found.`);
    return null; // return null on faliure
  }
}

/**
 * Lists files to and returns them.
 * @returns dictionary of journals
 */
export function listFiles() {
  const journals = getJournals(); // dictionary of all journals
  return journals; // returns all journals
}

/**
 * Filters the files by year and month.
 * @param {number} year year to query
 * @param {number} month month to query as number between 1 and 12
 */
export function filterDate(year, month) {
  const journals = getJournals(); // dictionary of all journals
  const targetYearMonth = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`; // query string
  console.log(targetYearMonth);

  for (const journal in journals) { // filter through journals for matching year + month
    const journalDate = journals[journal].date; // get journal date
    const journalYearMonth = journalDate.slice(0, 7); // take year + month of journal date

    if (journalYearMonth === targetYearMonth) { // check if query strings match
      journals[journal].filter = true; // update to pass filter
    } else {
      journals[journal].filter = false; // journal fails filter
    }
  }

  const jsonString = JSON.stringify(journals); // stringify and update local storage
  console.log(jsonString);
  localStorage.setItem('journals', jsonString);
}

/**
 * Filters the files by phrase in file.
 * @param {string} str phrase to query
 */
export function filterWord(str) {
  const journals = getJournals(); // dictionary of all journals
  for (const journal in journals) { // filter through journal text for matching string
    if (journals[journal].data.toUpperCase().includes(str.toUpperCase())) { // ignore case sensitivity
      journals[journal].filter = true; // update to pass filter
    } else {
      journals[journal].filter = false; // journal fails filter
    }
  }
  const jsonString = JSON.stringify(journals); // stringify and update local storage
  localStorage.setItem('journals', jsonString);
  loadButtons(); // regenerate all buttons
}

/**
 * Clears the current filtering options.
 */
export function clearFilter () {
  const journals = getJournals(); // dictionary of all journals
  for (const journal in journals) { // iterate through journals and reset all filters
    journals[journal].filter = true;
  }
  const jsonString = JSON.stringify(journals); // stringify and update local storage
  localStorage.setItem('journals', jsonString);
  loadButtons(); // regenerate all buttons
}

// helper

/**
 * Clears the current localStorage.
 */
export function clearLocal() {
  //localStorage.clear();
  localStorage.removeItem('journals'); // remove the current journal dictionary from local storage
    
  console.log('Local storage has been cleared.');
}

/**
 * Gets current journals from local storage.
 * @returns dictionary of journals
 */
export function getJournals() {
  const journals = localStorage.getItem('journals'); // get journals string from local storage
  let journalObj = {}; // create blank journals object
  const jsonString = JSON.stringify(journalObj); // convert to string
    
  if (journals) { // check if journals exist
    journalObj = JSON.parse(journals); // return journals as dictionary
    return journalObj;
  } else { // if journals don't exist
    localStorage.setItem('journals', jsonString); // create new journals object and store it
    return journalObj;
  }
}

/**
 * Gets the date today and formats it.
 * @returns formatted date 'YYYY-MM-DD'
 */
export function formatToday() {
  const d = new Date(); // create a new date, defaults to today
  let month = `${  d.getMonth() + 1}`; // month string
  let day = `${  d.getDate()}`; // day string
  const year = d.getFullYear(); // year string

  if (month.length < 2) { // format Jan to Sept
    month = `0${  month}`;
  }
  
  if (day.length < 2) { // format days less than 10
    day = `0${  day}`;
  }

  return [year, month, day].join('-'); // return formatted date
}

/**
 * Gets the year and month today.
 * @returns dictionary with year and month
 */
export function getCurrentYearAndMonth() {
  const currentDate = new Date(); // create new date, defaults to today
  const currentYear = currentDate.getFullYear(); // get year of today
  const currentMonth = currentDate.getMonth() + 1; // get month of today
  return { year: currentYear, month: currentMonth }; // return dictionary with year and month
}
