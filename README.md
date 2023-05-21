# Description of the project

This is the pre-assignment for Solita Dev Academy Finland 2023: Helsinki City Bike.

The aim of this project is to provide information on journeys and display stations information of Helsinki City Bikes.

The deployed app can be found here:

# Contents

<li>Installation
<li>Database configuration

<li>Run tests

# Installation (on Mac OS as an example)

To install the app, you need to install Node.js on your system.

To check if you have installed Node.js and npm, Run the following command in your terminal:

    node -v
    npm -v

To install Node.js using Homebrew (Homebrew need to be installed on your system).

Homebrew installation: Paste the following command in a macOS Terminal or Linux shell prompt.

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Then run the following command to install node.js:

    brew install node

You can find more information on install Node.js and npm from <a ref="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">here</a>.

## Clone the whole repository

To clone the whole repository, run the following command:

    git clone https://github.com/ruhui0806/dev-academy-2023-exercise.git

## Clone the backend:

To clone the backend, go to the repository and run the following commands:

    cd dev-academy-2023-exercise/server
    npm install

## Clone the frontend:

To clone the frontend, go to the repository and run the following commands:

    cd dev-academy-2023-exercise/client
    npm install

# Database configuration

This application uses MongoDB Atlas database for data storage.
To use the MongoDB database, you need to follow these steps:

<li> Register/Login to your account: https://account.mongodb.com/account/login
<li> Once you've created and logged into your account, select the free option of cloud database creation.
<li> Pick the cloud provider (e.g., aws), and region (e.g., Stockholm).
<li> Set up the username and password for the database connection (they are different from your loggin credentials). These will be used for connecting your app to the database.
<li> Go to the "Network Access" tab and set "ALLOW ACCESS FROM ANYWHERE".
<li> Go to the "Database" tab and click connect. Then choose "Connect to your aaplication".
<li> The page will display MongoDB URI, which will be added to your application. The URI looks like this:
    
    mongodb+srv://ruhuiwensahla:<password>@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority
<li> Copy link above, and replace the "password" tag with your password for database connection. 
This link will be added to the .env file in your backend folder (server folder).

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
