This repo will be a practice repo for citybike app with REST API

# how to run test for backend:

go to the server folder, and run with the following command:
npm run test

Run tests one by one:
The following command only runs the tests found in the tests/journey_api.test.js file:
npm test -- tests/journey_api.test.js

# how to run test for frontend:

Run React Test: go to the client folder, and run with the following command:
CI=true npm test -- tests/JourneyRow.test.js

Run e2e test: When both the backend and frontend are running, go to the client folder,we can start Cypress with the command:
npm run cypress:open

then select "E2E Testing" tab from the page
then click "Start E2E Testing in Chrome/Electron"
then click to run the file "city-bike-app.cy.js"
