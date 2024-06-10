# Sprint 2 Review Meeting

## Attendance
- Bernico Jansen Chandra
- Minsang Kim
- Michael Cheung
- Sam Hormozian
- Aritra Dutta
- Ryan Seidl
- Taiki Yoshino
- Rick Rodness
- Elijah Hosaka
- Sarena Pham
- Ishika Agrawal

## Quick Review on Past Sprint
### Skeleton
* Formulated the design outline & wireframe through Figma
* Started with making basic skeleton code through Figma-to-code converter (HTML & CSS)
  --> Modified various parts to make it fit into our design 
* Made div and section elements for each widget and functionality
* Made interactable buttons for widgets
* Found the widget icon images through Google Fonts
* Chose the default font for the theme
* Enhance the interactability through extra modification in CSS

### Sleep Widget
- Came up with rough design of the sleep widget: intuitive UI Design and appropriate form to be displayed in the pop-up screen. 
- ***Sleep widget design features:***
- -->Five selectable options for sleep hours.
- -->An intuitive emoji for each option.
- -->A vertical slider bar to choose the option.
- -->The font color of the label for the selected option changes.
- Initially started with a horizontal slider, but switched to a vertical orientation. Although the implementation became slightly more complicated, it was more suitable for display on a vertical rectangular pop-up screen.
- Created five emotive emoji pictures.
- To prevent the format from being corrupted when rotating the slider to a vertical orientation, an additional container was used.

### Emotion Widget
* Came up with rough design of the emotion widget: similar to slider widget from warm-up with a few UI changes to improve aesthetic
* ***Emotion widget design features:***
* --> selectable emotions laid out on a gauge similar to a speedometer
* --> a needle points to the emotion that the use selects
* --> cursor tracking function to update needle rotation and current emotion being hovered over
* --> custom emotion icons
* --> slimmer, sleeker design to fit on sidebar of dev journal
* began implementation by copying over original slider design from warm-up activity
* removed the slider, fixed container sizing as well as reorganized the widget containers from scratch
* implemented the emotion gauge, took lots of time messing with sizing and positioning before I eventually got it right
* drew the icons for each of the five emotions
* implemented the icons and new text font for each of the emotions
* added cursor tracking as well as event listeners to automatically change the selected emotion when the user hovered the cursor over it
* adjusted sizing and positioning until the widget matched our initial design

### Lines of Codes Widget
* Created A rough design of the lines of code widget: a simplistic design so that the user could input the lines of code per day.
*  ***Lines of Code Widget design features:***
*   --> Able to add or decrease lines of code written using the + and - buttons
*   --> Confirm button once the user is done inputtiing when he is done writing the lines of code for the day
*   --> User can also access the number directly and change it manually as it is a textbox (only accepts numbers).
*   --> Once confirm is clicked it switches to a celebration screen
*   --> Celebration screen displays message "Great Job" and has confetting falling (within the box for the widget).
*   Started the implementation by creating a box approximately the size of the widget popout for DevDiary
*   Added text " How many lines have you written today", along with the buttons confirm, +, and -
*   Added the Text box in the middle (which only takes in numbers)
*   Centered everything and used the proper colors for our theme, as well as the proper fonts and font sizes
*   Added functionality to the buttons (so that + and - will change the number) and confirm brings it to a new screen
*   Added a hover effect when hovering over the buttons
*   Created the conform screen with a new message "Great Job"
*   Added confetti so that it only falls within the widget box
*   Made final adjustments to to centering. 
  
### Summary Widgets
- Widget consists of a button dropdown that shows mood history using emojis as well as lines of code written and hours of sleep using bar charts. Tracks past weekly progress. All done.

### Text Editor
The text editor consists of a text area where journal entries can be edited with the use of some text tools. This includes using bolding, italics, underlining, and color. Editing text in the text editor would send live updates to the database and we made this choice because the application itself is very lightweight and we could afford to. The alternative to this was to do a time based auto saving system with a manual saving feature, but we did not have time to implement this. Aside from this, we also added a way to change the title easily by clicking on the existing title at the top of the screen and editing it directly. We think this is good and makes it easy. However, it is not completely intuitive so we will be adding a small icon next to it to signify this. Overall, the text editor is a text area with some text editing features which updates the database.

### Backend
The backend consisted on a file system that interfaced with the local storage through the use of JSON files. This would let the different components interact with the existing journal database in the local storage and affect different elements like color, data, etc. We used JSON strings for this because it was an easy way to convert dictionaries into a string format that could be stored. This also allowed us to store a lot of information easily and locally, which is something we focused on. The main component visually worked on alongside the backend was the journal navigation because changes to the journal navigation had to refresh this component to match. Overall, this involved the creation of the file system with a database, a file navigation/search system, and filtering integrated.

### Animation
- Implemented class-based animations for widgets to adapt to layout changes
- Developed a burger menu to toggle visibility of widgets
- Added slide down animations for burger menu to display weidgets
- Added hover effect with vibration animation for widget buttons


### Date
- A simple data chooser widget / UI that lets the user to pick the date of the journal.
- The designs are made to be simple (without needing to use complex javascript to pull it off), yet more than just the default dropdown layouts.
- All functionalities are done and only needs to be integrated to the main / skeleton code.

## Notes On What We Should Do Next Time
- We should be a lot more organized in order to see what is done and what isn't.
- We should pick up the pace with integrating all of the codes so we have time to get feedbacks.
- We should also update the previous admin things like the graph for our CI/CD to be more updated.
