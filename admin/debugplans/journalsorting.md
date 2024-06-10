# Defaulting Journal Sorting Feature

## Description
Journal sorting is still problematic. There is no way to show all after picking a date. Furthermore, reloading defaults the calendar to January of the year, but the listed journals still show those in the month before reloading.

## Way to reproduce
- Select a month and year (now not being able to revert to show all)
- Reload the page

## Plans to tackle the bug
- Add a new button to revert sorting, so that it's possible to show all
- Save the calendar picked to local storage so that the calendar always shows the correctly chosen one, similar to the journals being shown.
