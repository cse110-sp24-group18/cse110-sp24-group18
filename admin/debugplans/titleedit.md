# Journal Title Edit Bug

## Description
Journal titles in the sidebar are still prone to bugs, most particularly when editing them. As mentioned in the issue, the title that is edited can be stuck to just be one of the journals, meaning effectively only one of the journals can be named in one session. Furthermore, refreshing seems to fix the issue until another journal is renamed. This bug was just very recently refound meaning it is not yet debugged at the time of deployment.

## Way to reproduce
- Open one of the journals
- Rename its title to something else
- Switch journal and change its title

## Plans to tackle the bug
- Implementing E2E tests that tackle renaming multiple journals
- Debugging by looking at the script for the journal, to see if there is a stray variable that wrongly selects the journals.
