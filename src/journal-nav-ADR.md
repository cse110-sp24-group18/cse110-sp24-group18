# Journal Navigation
## Name:
Michael Cheung
## Problem to solve
The main problem to solve with the navigation was creating an easy and compact way to go to any journal and open it.
## Initial Ideas
My initial ideas consisted of a list/folder based navigation system, a calendar based system, or a date search based system. This is based off previous notetaking apps we as a group looked at or I have used in the past. Each of these have pros and cons and here are the main ones I personally considered.
### List/Folder based navigation:
Pros: Very intuitive, less clicks to get to recent files, less implementation time
Cons: Limited filtering options without making it convoluted
### Calendar based system:
Pros: Very intuitive, allows for very quick/efficient searching of past files
Cons: Longer implementation time, could be difficult to do visuals
### Date search based system:
Pros: Very specific query, very little implementation time
Cons: Bad UX (requires user to remember certain days)
## Direction
After weighing out these different ideas and taking a look at some different visual designs, I settled on the list/folder based navigation as a sidebar. This is because of the listed pros but also because it fit the rest of our components well on the page. Additionally, we don't have much time, so implementing something simple can't hurt.
## Tech Design Choices:
With the general concept out of the way, I came up with a list of things I would need to build this.
- Filtering System: this would be required since all the journals are in a long list and it would be bad design for there not to be filtering of some kind.
- Journal entries with obvious visuals: what this means specifically is when someone looks at the journal navigation, they should be able to immediately diffrentiate between different journals, tell what day it was made, what it was about, etc.
- Scrolling for journals: Since all the journals are in a list, scrolling is definitely required, independent of the rest of the app.
- Basic file system to interface with local storage: I decided to use local storage to simplify the project and therefore need some kind of system to interact like an API.
## Outcome:
With these required features in mind, I built it keeping in mind that it would link with components later in the future. In the eventuality that we may use something like electron.js, I also isolated the local storage functions so there would be very little we would need to do to convert it.
There are no libraries used and the only imports are fonts.
