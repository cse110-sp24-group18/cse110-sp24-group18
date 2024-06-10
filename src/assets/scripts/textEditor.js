import { formatToday, getJournals, selectDate, writeFile } from './fileSys.js';
import { loadButtons, buttonListeners, generateToday } from './journalNav.js';

/**
 * Sets the id of noteTitle element to the current date
 */
export function setDate() {
  const noteTitle = document.querySelector('.title'); // note title element
  noteTitle.id = formatToday();
  updateText(formatToday());
  
}

function updateJournal(date, contentHTML) {
  const content = document.querySelector('#content'); // content box element
  if (content && content.getAttribute('contenteditable') === 'true') {
    const journals = getJournals();
    const journal = journals[date];
    journal['data'] = contentHTML;
    writeFile(journal, date);
  } else {
    return 'Container not found or not contenteditable';
  }
}


export function textEditorListeners() {
  const boldBtn = document.querySelector('#bold-btn'); // old button element
  const underlineBtn = document.querySelector('#underline-btn'); // underline button element
  const italicBtn = document.querySelector('#italic-btn'); // italic button element
  const colorBtn = document.querySelector('#color-btn'); // color button element

  const content = document.querySelector('#content'); // content box element
  const noteTitle = document.querySelector('.title'); // note title element

  content.addEventListener('input', () => {
    const currDate = noteTitle.id;
    const contentHTML = content.innerHTML;
    updateJournal(currDate, contentHTML);
    loadButtons();
    buttonListeners();
  });

  // Enable editing of the note title on click
  noteTitle.addEventListener('click', () => {
    const input = document.createElement('input');  // create new input element
    input.type = 'text';  // set input element to text box
    input.value = noteTitle.textContent;  // set current input value to current note title
    input.className = 'title-input';  // set input element class name
    noteTitle.replaceWith(input); // replace noteTitle element with input element
    input.focus();  // focus on input element
  
    input.addEventListener('blur', () => {
      const getId = noteTitle.id;
      const newTitle = document.createElement('h4');  // create new newTitle element
            
      const journals = getJournals();
      const journal = journals[getId];
      if (input.value === '') {
        input.value = 'Untitled';
      }

      journal['title'] = input.value;
      writeFile(journal, getId);
      loadButtons();
      buttonListeners();
    
      newTitle.innerHTML = `<b>${input.value}</b>`; // set innerHTML content of newTitle to input value
      newTitle.className = 'title'; // set newTitle element class name
      input.replaceWith(newTitle);  // replace input element with newTitle element
      newTitle.addEventListener('click', () => {
        input.value = newTitle.textContent; // set current input value to newTitle value
        newTitle.replaceWith(input);  // replace newTitle with input element
        input.focus();  // focus on input element
      });
    });
  });

  boldBtn.addEventListener('click', () => {
    document.execCommand('bold');  // make the text bold on button click
  });
    
  underlineBtn.addEventListener('click', () => {
    document.execCommand('underline'); // make the text underlined on button click
  });
    
  italicBtn.addEventListener('click', () => {
    document.execCommand('italic');  // make the text italic on button click
  });
    
  colorBtn.addEventListener('input', () => {
    document.execCommand('forecolor', false, colorBtn.value);  // change the text color on button click
  });
}

export function updateText(date) {
  let journals = getJournals();
  let currJournal = journals[date];
  console.log(currJournal);
  if (!currJournal) {
    generateToday();
    journals = getJournals();
    currJournal = journals[date];
  }

  console.log(currJournal);
  const text = currJournal.data;
  const title = currJournal.title;

  const titleElement = document.getElementsByClassName('title-container');
  const titleDisplay = titleElement[0].querySelector('h4');
  const contentElement = document.getElementById('content');

  contentElement.innerHTML = text;
  titleDisplay.innerHTML = `<b>${title}</b>`;

  titleDisplay.id = date;
  selectDate(date);
}