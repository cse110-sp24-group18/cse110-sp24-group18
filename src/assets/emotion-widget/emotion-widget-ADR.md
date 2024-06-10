# Emotion Widget
## Name:
Ryan Seidl
## Problem to solve
The main problem to solve with the emotion widget was creating a satisfying, aesthetically pleasing tool for the user to select and log how they're feeling while writing each diary entry.
## Initial Ideas
As a team, we came up with the idea to implement the emotion widget for our dev journal similar to the slider widget that we created in the warm-up exercise. However, we wanted to change the UI of the widget by making the main tool of selection a gauge instead of a slider. We made this decision by weighing the pros and cons of each implementation.
### Slider selector:
Pros: Very easy to understand, highly accessible, easy to implement
Cons: Not very aesthetically pleasing, generic style
### Gauge selector:
Pros: Very unique-looking design, colorful and appealing, visually comprehensible
Cons: More difficult to implement, slightly less accessible
## Direction
After weighing out these different ideas, we decided to go with the gauge selector design. Implementin the slider selector into our final project seemed very repetitive since it would entail simply copy-pasting our work from the warm-up. Additionally, a horizontal slider seemed too boring and visually unappealing for us to want to include it in our dev diary. On the other hand, the gauge selector seemed very fresh and much more aesthetically pleasing. We felt that this design would greatly diversify the emotion widget from our other widgets, especially the sleep widget. Though this decision would slightly sacrifice accessibility, we believed the visual upgrade present in the emotion widget would certainly make up for this.
## Tech Design Choices:
- Adaptable container format: I implemented the emotion widget separately from the actual dev journal at first, so I had to make sure it would be quick and easy to transfer and integrate the widget into the final product when ready.
- Gauge selector tool: implemented strictly using CSS tools, easily configurable whether that means modifying size, position, colors, etc.
- Persistent cursor tracking: this feature makes the widget feel more responsive, as the colors and visuals constantly update according to the user's cursor position 
- Relative sizing, positioning: by using relative units for sizing and positioning, I'm able to ensure that the UI for the widget looks the same across any device/screen size
## Outcome:
I implemented each of these design choices into the (almost) final version of the emotion widget. I also wrote a function in the JavaScript that outputs the emotion that the user clicks on from the emotion gauge. This way, it will be easy to integrate the emotion widget wtih the summary widget when both are done and integrated into the final product.
There are no libraries used and the only imports are fonts.
