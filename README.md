# Description of the project

This is the pre-assignment for Solita Dev Academy Finland 2023: Helsinki City Bike.

The aim of this project is to provide information on journeys and display stations information of Helsinki City Bikes.

More information about the pre-assignment requirements can be found here: https://github.com/solita/dev-academy-2023-exercise

<br>

# Technologies highlight

<li>Node.js + Express
<li>REST API
<li>React.js
<li>MongoDB  + Mongoose
<li>CSS, Material UI

<br>

# Contents

<li>Installation
<li>Backend configuration
<li>Database configuration
<li>Google Map API configuration
<li>Add data to the database
<li>Run the application
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

You can find more information on install Node.js and npm from here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

<br>

## Clone the whole repository

To clone the whole repository, run the following command:

    git clone https://github.com/ruhui0806/dev-academy-2023-exercise.git

Go to the repository:

    cd dev-academy-2023-exercise

To install the backend and frontend, go to the server folder and client folder, and run the following command, respectively:

    npm install

Note: if the above command fails, you can try the following command:

    npm install --force

<br>

# Backend configuration

To make the backend run, go to the server folder and create a ".env" file.
Add the following environment variable in the .env file:

    PORT = 3001

<br>

# Database configuration

This application uses MongoDB Atlas database for data storage.
To use the MongoDB database, you need to follow these steps:

<li> Register/Login to your account from here: https://account.mongodb.com/account/login

<li> Create a new project, and the under the project, click "Build a Database".
<li> Select one option of cloud database creation (NB: The free option will only allow you to store max. 512 MB data, i.e., 2 months of journeys data).
<li> Pick the cloud provider (e.g., aws), and region (e.g., Stockholm).
<li> Set up the username and password for the database connection (they are different from your loggin credentials).<Strong> The credential will be used for connecting your app to the database.</Strong> Then click "Create User".
<li> Then it will let you choose the environment. Let's choose "My Local Environment".
<li> Optionally, you can set allow network access from anywhere: Go to the "Network Access" tab (left sidebar), click on "+ ADD IP ADDRESS", then click on "ALLOW ACCESS FROM ANYWHERE". Then click "confirm".
<li> Go to the "Database" tab on the left sidebar and click "Connect". Then choose "Connect to your aplication". On the pop out view, click on "Drivers" option. This will lead to a new page, where the driver is Node.js by default.
<li> The page will also display MongoDB URI, which will be added to your application. The URI looks like this:
    
    mongodb+srv://ruhuiwen0608:<password>@cluster0.qtg0yd1.mongodb.net/?retryWrites=true&w=majority
<li>  Copy paste the link above to the .env file (in the server folder) and name it as "MONGODB_URI" (like below).

    MONGODB_URI = "mongodb+srv://ruhuiwensahla:<password>@cluster0.o1opl.mongodb.net/yourDatabaseName?retryWrites=true&w=majority"

<li>Replace the "<'password>" tag with your password for database connection, and replace "yourDatabaseName" with your application name in the URI (before the question mark):
<br></br>

# Google Map API configuration

This application use Google Map API key for displaying stations location. To make the application function properly, you need to have a Google Map API key.
Follow the following instructions to obtain a Google Map API key:

<li> Go to the following website and log in to your account:
https://console.cloud.google.com/
  
<li> Click the "Select a project" dropdown button and select your project by clicking the project's name. If you don't have a project, click the "NEW PROJECT" button to create one.
<li> Go to the project dashboard and click on the "APIs and services" and then on the next page, click on "Credentials" in the left sidebar.
<li> Once you are in the credential dashboard, click "CREATE CREDENTIALS" on the topbar and then choose "API key". Wait until the key is created. 
<li> Save your API key from the popup window to the .env file, and name it as follows:

    REACT_APP_GOOGLE_MAPS_API_KEY = "replace-with-your-google-map-api-key"

<li> Add the billing informaion and payment method to your google account in order to get access to the Google API service. 
<br></br>
 NB: You can either restrict your key by clicking on your api key then "Restric key" option (under the "API restrictions"), and select APIs you want to use (e.g., Maps Javascript API, Maps Embed API, Places API, Geocoding API, Geolocation API), then click "save". Or you can leave your API key as no restrictions.
<br></br>

# Add data to the database

As the free version of MongoDB atlas can only store up to 512 MB data, so you can upload maximum two months of the journey data. Upgrade your MongoDB if you want to use more data.

First, you need to install the wget using homebrew:

    brew install wget

## Add journey data to the database

Follow the steps below to download journey data from the internet and upload them to your MongoDB database:

<li> Go to the server folder, and download data:
    
    cd server
    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
    wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

<li> Name them as "2021-05.csv, 2021-06.csv, 2021-07.csv" respectively.
<li> Open the file "readCSV-journey.js" in your editor. Match the file name in your file system with the name in the code (line 39):

    fs.createReadStream("./2021-05.csv")

NB: Example above will parse the journey data in the file "2021-05.csv".

<li> Run the following command in the server folder:

    node readCSV-journeys.js

<li> Press keys "ctrl + C" to stop the process.
<li> Repeat the above steps until you have finished upload journey files.
<br></br>

## Add station data to the database

Follow the steps below to download station data from the internet and upload them to your MongoDB database:

<li> Go to the server folder and download the station data:

    wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

<li> Rename the file as "stations.csv":

    mv 726277c507ef4914b0aec3cbcfcbfafc_0.csv stations.csv

<li> Under the server folder, run the following command to parse and upload data to MongoDB:

    node readCSV-stations.js

<li> Press keys "ctrl + C" to stop the process.

Now the data will be parsed, filtered, and uploaded to the MongoDB database.
<br></br>

# Run the application

<li> Go to the server folder and run the backend:

    cd server
    npm run dev

<li> Then go to the client folder, and run the frontend:

    cd ../client
    npm start

## Run the application in Docker:

To run the application in Docker, you need to Download Docker and install it firstly: https://www.docker.com/get-started/

After installation, open the Docker.

By default the application will run on localhost:3001. Make sure no program is running on port 3001 when you run the application in Docker.

In the terminal, go to the server folder, and run the following command:

    npm run build:ui
    docker compose up --build

Now the application is running on: http://localhost:3001/

<br>

# Run test for backend:

<li> Under the server folder, add the environment variable "TEST_MONGODB_URI" to .env file for testing with a separate database:

    TEST_MONGODB_URI = "mongodb+srv://ruhuiwensahla:<password>@cluster0.rsorbpa.mongodb.net/testCitybike?retryWrites=true&w=majority"

<li> Go to the server folder, and run all the tests with the following command:

    npm run test

<li> Or run tests one by one. The following command only runs the tests in the tests/journey_api.test.js file:

    npm test -- tests/journey_api.test.js

<br>

# Run test for frontend

## Run React Test

<li> Go to the client folder, and run each test with the following command:

    CI=true npm test -- tests/JourneyRow.test.js

NB: run the test in JourneyRow.test.js file.
<br></br>

## Run end-to-end test

<li> Make sure that both the backend and frontend are running properly.
<li> Go to the client folder, we can start Cypress with the command:

    npm run cypress:open

<li> Select "E2E Testing" tab from the page.
<li> Click "Start E2E Testing in Chrome/Electron".
<li> Click on the file name "city-bike-app.cy.js" to run the test.
