# Travel-Tracker-Remix-API

## Important!
- This api has been deployed to Heroku. There may be some loading time and refreshing required in order to "wake" the app up from Heroku's sleep mode
- This api was modified from the <a href="https://github.com/turingschool-examples/travel-tracker-api">original api</a> created by <a href="https://turing.edu/">
Turing School of Software and Design</a>. 
- The original api was intended to be used in conjucture with this frontend <a href="https://frontend.turing.edu/projects/travel-tracker.html">Turing project</a>
- This api is intended to be used with the <a href="https://github.com/justincanthony/travel-tracker-remix">travel-tracker-remix project.</a>


## About
The goal of this project was to gain more experience with creating new endpoints to an existing api using `expressjs`. By adding several new endpoints documented below, the frontend application can simplify it's fetch calls by making more specific data requests, and lighten the load of using iterators to filter through uneeded data.
<br/>

This api was updated to include:
- a new endpoint for grabbing a single user's trips (past, pending, and approved) by `userID` 
-  new logic to send the matching destination object along with the single user's trips. This simplifies the previous need for filtering and matching from two different api calls and data sets on the frontend
- a new endpoint to verify a user's name and password information by sending the required params of username and password for logging in


## Set Up - Two Methods

**To run the server locally**

Clone this down, and `cd` into it.  Then run:

`npm install`

`npm start`

_or_

**Use the Heroku Deployed API**

Use the `https://travel-tracker-remix-api.herokuapp.com/api/v1` path to make GET, POST, and DELETE requests with the appropriate endpoints below.
_Please note that the app may be in Heroku's sleep state and may need some loading time to "wake up."_

## Endpoints

**When using the Heroku deplyed API use the following protocol and domain:**
`https://travel-tracker-remix-api.herokuapp.com/api/v1/`

**Endpoints (suffixes) are the same**

Example to retrieve all destinations: `https://travel-tracker-remix-api.herokuapp.com/api/v1/destinations`

| Description | URL | Method | Required Properties for Request | Sample Successful Response |
|----------|-----|--------|---------------------|-----------------|
| Get all travelers|`http://localhost:3001/api/v1/travelers`| GET  | none | object with `travelers` property containing an array of all travelers |
| Login and get traveler | `http://localhost:3001/api/v1/<username>/<password>` | GET | none | object of single traveler's info |
| Get single traveler|`http://localhost:3001/api/v1/travelers/<userID>`     *where`<userID>` will be a number of a traveler's id* | GET  | none | object of single traveler's info |
| Get all trips| `http://localhost:3001/api/v1/trips` | GET | none | object with `trips` property containing an array of all trips |
| Get single traveler trips with matching destination object | `http://localhost:3001/api/v1/trips/<userID>` | GET | none | object with `trips` property containing an array of all trips and a `place` property containing the destination information|
| Get all destinations| `http://localhost:3001/api/v1/destinations` | GET | none | object with `destinations` property containing an array of all destinations |
| Add new trip |`http://localhost:3001/api/v1/trips`| POST | `{id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings>}` | `{message: 'Trip with id <id> successfully posted', newTrip: <Object with trip info just posted>}`|
| Add new destination|`http://localhost:3001/api/v1/destinations`| POST | `{id: <number>, destination: <string>, estimatedLodgingCostPerDay: <number>, estimatedFlightCostPerPerson: <number>, image: <string>, alt: <string>}` | `{message: 'Destination with id <id> successfully posted', newDestination: <Object with destination info just posted>}`|
| Modify single trip | `http://localhost:3001/api/v1/updateTrip` | POST | `{id: <number>, status:<String of 'approved' or 'pending', suggestedActivities: <Array of strings>}` *Only a status* **or** *a suggestedActivities property is required for a successful request*| `{message: 'Trip #<id> has been modified', updatedTrip: <Object with newly updated data>}`|
| Delete single trip| `http://localhost:3001/api/v1/trips/<id>`     *where`<id>` will be a number of a trip's id*  | DELETE | none | Trip #<id> has been deleted |
