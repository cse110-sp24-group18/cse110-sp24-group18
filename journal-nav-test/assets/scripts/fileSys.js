/**
 * Creates a file with basic text data.
 * @param {string} data text associated with date
 */
function createFile(data) {
    const dateToday = formatToday(); // todays date
    let journals = getJournals(); // dictionary of all journals
    const defaultTitle = 'Untitled'; // default title when there is no title
    
    const templateJson = { // template for data
        'data': data, // text data
        'date': dateToday, // date of creation
        'lastMod': dateToday, // date of modification
        'title': defaultTitle, // title for journal
        'filter': true, // whether a journal passes filter
        'mood': '', // mood on the day
        'currentlySelected': false // current selection
    };

    if (dateToday in journals) { // deny creation if journal day exists
        console.log(`Date already exists.`);
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
function forceCreate(data, date, title) {
    const dateToday = formatToday(); // same as createFile() with ability to set certain fields
    let journals = getJournals();

    if (!title) {
        title = 'Untitled';
    }

    const templateJson = {
        'data': data,
        'date': date,
        'lastMod': dateToday,
        'title': title,
        'filter': true,
        'mood': '',
        'currentlySelected': false
    };

    if (date in journals) {
        console.log(`Date already exists.`);
    } else {
        journals[date] = templateJson;
        const jsonString = JSON.stringify(journals);
        localStorage.setItem('journals', jsonString);
        console.log(`Force created JSON file: '${date}' and added to localStorage.`);
    }
}

function selectDate(date) {
    let journals = getJournals();
    for (journal in journals) {
        if (journal === date) {
            journals[journal]['currentlySelected'] = true;
            console.log('SELECTING: ' + journal);
        } else {
            journals[journal]['currentlySelected'] = false;
            console.log('NOT SELECTING: ' + journal);
        }
    }
    console.log(journals);
    const jsonString = JSON.stringify(journals);
    localStorage.setItem('journals', jsonString);
}

/**
 * Writes new data to a current file.
 * @param {dict} newData replacement data
 * @param {string} date date to query
 */
function writeFile(newData, date) {
    console.log('NEW DATA INC: ' + JSON.stringify(newData));
    const dateToday = formatToday(); // todays date
    let journals = getJournals(); // dictionary of all journals

    if (date in journals) { // check if journal exists
        journals[date] = newData; // rewrite data field
        journals[date]['lastMod'] = dateToday; // update last modified date
        const jsonString = JSON.stringify(journals); // stringify and add to local storage
        localStorage.setItem('journals', jsonString);
        console.log(`Modified JSON file: '${date}' and added to localStorage.`);
        console.log(newData);
        console.log(getJournals());
    } else { // if it doesn't exist
        forceCreate(newData['data'], date); // create a file on the day with text data
        writeFile(newData, date); // write to newly created file with all data
    }
}

/**
 * Deletes a given file.
 * @param {string} date date to query
 */
function deleteFile(date) {
    let journals = getJournals(); // dictionary of all journals

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
function readFile(date) {
    let journals = getJournals(); // dictionary of all journals

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
function listFiles() {
    const journals = getJournals(); // dictionary of all journals
    console.log(`Listing all journals: '${JSON.stringify(journals)}'`)
    return journals; // returns all journals
}

/**
 * Sorts files by date created and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
function sortByDateCreated(val) {
    const journals = getJournals(); // dictionary of all journals
    let entries = Object.entries(journals); // convert dict to object to sort
    
    // sort ascending or descending based on parameter
    if (val === 1) { // 1 for descending (default)
        entries.sort((a,b) => b[1].date.localeCompare(a[1].date)); // comparison
        console.log('Sort by descending');
    } else { // anything else for ascending
        entries.sort((a,b) => a[1].date.localeCompare(b[1].date));
        console.log('Sort by ascending');
    }
    let sorted = Object.fromEntries(entries); // convert back to dictionary
    const jsonString = JSON.stringify(sorted); // stringify and update local storage
    localStorage.setItem('journals', jsonString);
    loadButtons(); // regenerate all buttons
}

/**
 * Sorts files by date last modified and reloads the buttons.
 * @param {number} val 1 for descending, other for ascending
 */
function sortByLastModified(val) {
    const journals = getJournals(); // dictionary of all journals
    let entries = Object.entries(journals); // convert dict to object to sort

    // sort ascending or descending based on parameter
    if (val === 1) { // 1 for descending (default)
        entries.sort((a,b) => b[1].lastMod.localeCompare(a[1].lastMod)); // comparison
        console.log('Sort by descending');
    } else { // anything else for ascending
        entries.sort((a,b) => a[1].lastMod.localeCompare(b[1].lastMod));
        console.log('Sort by ascending');
    }
    let sorted = Object.fromEntries(entries); // convert back to dictionary
    const jsonString = JSON.stringify(sorted); // stringify and update local storage
    localStorage.setItem('journals', jsonString);
    loadButtons(); // regenerate all buttons
}

/**
 * Filters the files by year and month.
 * @param {number} year year to query
 * @param {number} month month to query as number between 1 and 12
 */
function filterDate(year, month) {
    let journals = getJournals(); // dictionary of all journals
    const targetYearMonth = `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`; // query string

    for (let journal in journals) { // filter through journals for matching year + month
        const journalDate = journals[journal].date; // get journal date
        const journalYearMonth = journalDate.slice(0, 7); // take year + month of journal date

        if (journalYearMonth === targetYearMonth) { // check if query strings match
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
 * Filters the files by phrase in file.
 * @param {string} str phrase to query
 */
function filterWord(str) {
    let journals = getJournals(); // dictionary of all journals
    for (let journal in journals) { // filter through journal text for matching string
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
function clearFilter () {
    let journals = getJournals(); // dictionary of all journals
    for (let journal in journals) { // iterate through journals and reset all filters
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
function clearLocal() {
    //localStorage.clear();
    localStorage.removeItem('journals'); // remove the current journal dictionary from local storage
    
    console.log('Local storage has been cleared.');
}

/**
 * Gets current journals from local storage.
 * @returns dictionary of journals
 */
function getJournals() {
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
function formatToday() {
    var d = new Date(), // create a new date, defaults to today
        month = '' + (d.getMonth() + 1), // month string
        day = '' + d.getDate(), // day string
        year = d.getFullYear(); // year string

    if (month.length < 2) // format Jan to Sept
        month = '0' + month;
    if (day.length < 2) // format days less than 10
        day = '0' + day;

    return [year, month, day].join('-'); // return formatted date
}

/**
 * Gets the year and month today.
 * @returns dictionary with year and month
 */
function getCurrentYearAndMonth() {
    var currentDate = new Date(); // create new date, defaults to today
    var currentYear = currentDate.getFullYear(); // get year of today
    var currentMonth = currentDate.getMonth() + 1; // get month of today
    return { year: currentYear, month: currentMonth }; // return dictionary with year and month
}
