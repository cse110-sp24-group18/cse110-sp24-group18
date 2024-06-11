# Onboard

## Deployed Application
There are two ways to open the application and test it:
- Clone this repo into your local device, and then run a live server of index.html found in the [src directory](src).
- OR, open the [deployed web's URL here](https://cse110-sp24-group18.github.io/cse110-sp24-group18/src/index.html).

## Functionalities
General guide to access the functionalities:
- To select / delete past journals, click at them in the sidebar on the left. You cannot delete today's journal and new journal is automatically added each day.
- To sort the journals, simply adjust the calendar and the filters on top of the sidebar.
- To edit a journal, just click on the box under the title and the tools. To edit the title, double click on it, and click away to save.
- To open the widgets menu, click on the burger button found on the right side of the page, and click the widgets you like. All of their summary for the past 7 journals are in the summary menu, accessible to the button on the top right of the page.

## Main Pipeline and Deployment
How to use the main pipeline and deploy:
- Push all of the commits to main and wait until all of the workflows are done. This includes linting checks, general testings (E2E and unit), and code security check with Codacy.
  - If the linting check denies your code, run `npm run lint:fix` on local and manually fix your codes' styles if the automatic one can't.
  - If the tests denies your code, try to debug your changes so that they pass all of the tests in place.
  - The codacy report will be found in [our repo's codacy website](https://app.codacy.com/gh/cse110-sp24-group18/cse110-sp24-group18/dashboard).
- The page's deployment will also be automatically done by github page, [the link to the deployed application is in the README](https://cse110-sp24-group18.github.io/cse110-sp24-group18/src/index.html) to see the update.

## Documentation Pipeline
How to use the documentation pipeline:
- Push to / merge branch to documentation branch.
- The pipeline will generate the files on jsdocsgenerated on its branch.
- Remerge the branch to main so that all of the documentations are on main branch as well.
