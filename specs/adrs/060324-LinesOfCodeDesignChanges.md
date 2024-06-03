---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Lines of Code Widget/ UI changes + Bug Fixes
status:  accepted 
date: 2024-06-03 when the decision was last updated

# Lines of Code Bug Fixes UI changes and Testing File

## Context and Problem Statement
Lines of Code widget needed bug fixxes in its implementation as it was not incrementing and decrementing properly. Additionally THere were issues with zooming in and out where the font would look very off. Furthermore we had to add testing functionality to ensure that the code runs properly. 

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* If the input number is too big it looks out of place
* When zooming in and out it looks distorted
* … <!-- numbers of drivers can vary -->

## Considered Options

* A Cap on number of digits
* Dynamic Font size adjuster
* Testing File to test for all cases
* Keeping Outgoing Message with Confirm buttom. 
* … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: Chose options 1-3, as it could all be implented without any conflicts. We chose to get rid of the confirm button and the confetti, as it would not implement very well with the rest of the widget. Plus the outgoing message prevented people to further edit the lines if they wrote more code. 

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because it allowed for dynamic adjustment when it came to zooming in and out. It also ensured that everything fit properly and it adjusted font size based on how many digits were on there
* Bad, because we removed outgoing message and confirm button, which may curb enthusiasm for the user. 
* … <!-- numbers of consequences can vary -->


## More Information
Worked on the testing file to ensure that all features of the lines of code widget are checked. 
