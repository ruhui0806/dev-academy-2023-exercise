# Description of the project

This is the pre-assignment for Solita Dev Academy Finland 2023: Helsinki City Bike.

The aim of this project is to provide information on journeys and display stations information of Helsinki City Bikes.

The deployed app can be found here:
<br></br>

# Contents

<li>Installation
<li>Database configuration

<li>Run tests
<br></br>

# Installation (on Mac OS as an example)

To install the app, you need to install Node.js and Node Package Manager (npm) on your computer.

To check if you have installed Node.js and npm, Run the following command in your terminal:

    node -v
    npm -v

Homebrew is straightforward for installing Node.js and NPM. To install Homebrew, paste the following command in a macOS Terminal or Linux shell prompt.

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Then run the following command to install node.js:

    brew install node

You can find more information on install Node.js and npm from <a ref="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">here</a>.

## Clone the whole repository

To clone the whole repository, run the following command:

    git clone https://github.com/ruhui0806/dev-academy-2023-exercise.git

To install the backend and frontend, go to the server folder and client folder, and run the following command:

    npm install

<br>

# Backend configuration

<li>To make the backend run, go to the server folder and create a ".env" file.
<li> Add the following environment variable in the .env file:

    PORT = 3001

<br>

# Database configuration

This application uses MongoDB Atlas database for data storage.
To use the MongoDB database, you need to follow these steps:

<li> Register/Login to your account from <a ref="https://account.mongodb.com/account/login">here</a>. 
<li> Create a new project, and the under the project, click "Build a Database".
<li> Select one option of cloud database creation (NB: The free option will only allow you to store max. 512 MB data, i.e., 2 months of journeys data).
<li> Pick the cloud provider (e.g., aws), and region (e.g., Stockholm).
<li> Set up the username and password for the database connection (they are different from your loggin credentials).<Strong> The credential will be used for connecting your app to the database.</Strong> Then click "Create User".
<li> Then it will let you choose the environment. Let's choose "My Local Environment".
<li> Optionally, you can add IP address to your access list. Then 
<li> Go to the "Network Access" tab and set "ALLOW ACCESS FROM ANYWHERE".
<li> Go to the "Database" tab and click connect. Then choose "Connect to your aaplication".
<li> The page will display MongoDB URI, which will be added to your application. The URI looks like this:
    
    mongodb+srv://ruhuiwensahla:<password>@cluster0.o1opl.mongodb.net/citybike?retryWrites=true&w=majority
<li>  Copy paste the link above to the .env file (in the server folder) and name it as "MONGODB_URI" (like below). Replace the "password" tag with your password for database connection:

    MONGODB_URI = "mongodb+srv://ruhuiwensahla:<password>@cluster0.o1opl.mongodb.net/citybike?retryWrites=true&w=majority"

<li> 
<br></br>

# Google Map API key configuration

This application use Google Map API key for displaying stations location. To make the application function properly, you need to have a Google Map API key.
Follow the following instructions to obtain a Google Map API key:

<li> Go to the <a ref="https://console.cloud.google.com/">Google Cloud Console </a> and log in to your account. 
<li> Click the "Select a project" dropdown button and select your project by clicking the project's name. If you don't have a project, click the "NEW PROJECT" button to create one.
<li> Go to the project dashboard and click on the "APIs and services" and then on the next page, click on "Credentials" in the left sidebar.
<li> Once you are in the credential dashboard, click "CREATE CREDENTIALS" on the topbar and then choose "API key". Wait until the key is created. 
<li> Save your API key from the popup window to the .env file, and name it as "REACT_APP_GOOGLE_MAPS_API_KEY":

    REACT_APP_GOOGLE_MAPS_API_KEY = "repalce-with-your-google-map-api-key"

<li> Add the billing informaion and payment method to your google account in order to get access to the Google API service. 
<br></br>
 NB: You can either restrict your key by clicking on your api key then "Restric key" option (under the "API restrictions"), and select APIs you want to use (e.g., Maps Javascript API, Maps Embed API, Places API, Geocoding API, Geolocation API), then click "save". Or you can leave your API key as no restrictions.
<br></br>

# Add data to the database

As the free version of MongoDB atlas can only store up to 512 MB data, so you can upload maximum two months of the journey data. Upgrade your MongoDB if you want to use more data.

First, you need to install the wget package using homebrew in the server folder:

    cd server
    brew install wget

## Add journey data to the database

Follow the steps below to download journey data from the internet and upload them to your MongoDB database:

<li> Go to the server folder, and download data:

    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

<li> Rename them as "2021-05.csv, 2021-06.csv, 2021-07.csv" respectively.
<li> Open the file "readCSV-journey.js" in your editor. Match the file name in your file system with the name in the code (line 39):

    fs.createReadStream("./2021-05.csv")

NB: Example above will parse the journey data in the file "2021-05.csv".

<li> Run the following command in the server folder:

    npm run readCSV-journey.js

<li> Repeat the above steps until you have finished upload journey files.

## Add station data to the database

Follow the steps below to download station data from the internet and upload them to your MongoDB database:

<li> Go to the server folder and download the station data:

    wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

<li> Rename the file as "stations.csv".
<li> Under the server folder, run the following command to parse and upload data to MongoDB:

    npm run readCSV-stations.js

<br>

Now the data will be parsed, filtered, and uploaded to the MongoDB database.

# Run the application

<li> Run the backend with the following command in the server folder:

    npm run dev

<li> Then go to the client folder, and run the frontend:

    cd ../client
    npm start

# Run test for backend:

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
